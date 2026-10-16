async function fetchJson(fetchImpl, url) {
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}

export async function loadDashboard({ fetchImpl = fetch, render }) {
  // 1. Starea de încărcare este randată întotdeauna prima (înainte de primul await)
  const loading = { state: "loading" };
  render(loading);

  try {
    // 2. Pornim toate cele 3 cereri ÎN PARALEL (înainte de await)
    const profilePromise = fetchJson(fetchImpl, "/data/profile.json");
    const tasksPromise = fetchJson(fetchImpl, "/data/tasks.json");
    const noticesPromise = fetchJson(fetchImpl, "/data/notices.json");

    const [profile, tasksData, noticesData] = await Promise.all([
      profilePromise,
      tasksPromise,
      noticesPromise,
    ]);

    // Extragem lista de task-uri (fie că e direct array, fie că e în tasksData.tasks)
    const tasks = Array.isArray(tasksData) ? tasksData : (tasksData.tasks ?? []);

    // Calculăm câte task-uri sunt deschise (acoperă variantele uzuale din JSON)
    const openTaskCount = tasks.filter((t) =>
      "open" in t
        ? Boolean(t.open)
        : "done" in t
          ? !t.done
          : "completed" in t
            ? !t.completed
            : t.status === "open",
    ).length;

    // Extragem notices (fie că e direct array, fie în noticesData.notices)
    const notices = Array.isArray(noticesData)
      ? noticesData
      : (noticesData.notices ?? noticesData);

    // 3. Succesul combină exact o dată toate cele trei surse
    const success = {
      state: "success",
      profile,
      openTaskCount,
      totalTaskCount: tasks.length,
      notices,
    };

    render(success);
    return success;
  } catch (error) {
    // 4. Erorile HTTP și de parsare randează o eroare fără o respingere netratată
    const failure = {
      state: "error",
      message: error instanceof Error ? error.message : String(error),
    };

    render(failure);
    return failure;
  }
}