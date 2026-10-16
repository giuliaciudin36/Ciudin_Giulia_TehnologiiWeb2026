# Proiectul 01 — Tablou de bord cu surse multiple

## Obiectiv

Coordonați în paralel trei cereri independente din browser și randați stări explicite de încărcare, succes și eroare.

## Mod de lucru

Rulați proiectul `student`, deschideți instrumentele Network și observați starea permanentă de încărcare. Citiți inițializarea, rendererul, datele și testele înainte de a edita controllerul. Schițați cronologia promisiunilor și identificați ce trebuie să se întâmple înainte de primul `await`.

Dați Codex sarcina precisă din `spec.md`. Verificați dacă apar așteptări secvențiale, verificări `response.ok` lipsă, cereri duplicate, erori ascunse sau acces direct la DOM. Rulați verificările focalizate, apoi confirmați în browser că toate cele trei cereri pornesc împreună.

## Criterii de reușită

- Toate verificările trec.
- Starea de încărcare este randată întotdeauna prima.
- Succesul combină exact o dată toate cele trei surse.
- Erorile HTTP și de parsare randează o eroare fără o respingere netratată.
- Se modifică numai `public/dashboard.js`.

## Sarcină de depanare

Direcționați o cerere către o resursă inexistentă. Explicați de ce `fetch` se îndeplinește și pentru `404`, apoi restaurați validarea explicită a stării și verificați starea vizibilă de eroare.

## Ce ar trebui să puteți explica

- Crearea unei promisiuni față de așteptarea ei.
- Operații asincrone paralele față de cele secvențiale.
- Eșec HTTP față de un `fetch` respins.
- Separarea încărcării datelor de randarea DOM.
