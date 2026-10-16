export function renderDashboard(
  model,
  root = document.querySelector("#dashboard"),
) {
  root.dataset.state = model.state;
  root.className = model.state;
  if (model.state === "loading")
    root.textContent = "Se încarcă tabloul de bord…";
  else if (model.state === "error")
    root.textContent = `Tabloul de bord nu a putut fi încărcat: ${model.message}`;
  else
    root.innerHTML = `<h2>${model.profile.name}</h2><p>${model.openTaskCount} din ${model.totalTaskCount} sarcini sunt deschise</p><pre>${JSON.stringify(model.notices, null, 2)}</pre>`;
}
