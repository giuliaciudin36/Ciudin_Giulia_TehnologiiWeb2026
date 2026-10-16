# Specificația exercițiului — Tablou de bord cu surse multiple

## Unitate

Unitatea 03 — Module, asincronicitate, evenimente și browserul

## Obiectiv de învățare

Coordonarea în paralel a mai multor operații `fetch` independente și randarea stărilor explicite de încărcare, succes și eroare într-o aplicație ESM mică pentru browser.

## De ce există exercițiul

Aplicațiile din browser rareori așteaptă câte o singură sursă. Separarea încărcării datelor, combinării rezultatelor și randării permite urmărirea cererilor reușite și localizarea erorilor.

## Cerințe preliminare

- Funcțiile, array-urile/obiectele, citirea ESM și tratarea erorilor din Unitatea 2.
- Conceptele despre stări HTTP și JSON din Unitatea 1.

## Context inițial

Studenții primesc un proiect fără dependențe, servit de un mic server static Node furnizat. Cele trei resurse JSON deterministe, HTML/CSS, rendererul DOM, inițializarea aplicației și testele sunt complete. `loadDashboard({ fetchImpl, render })` este incomplet.

## Comportament obligatoriu

- Randați imediat `{ state: 'loading' }`.
- Porniți cererile pentru `/data/profile.json`, `/data/tasks.json` și `/data/notices.json` înainte de a aștepta vreun rezultat.
- Respingeți orice răspuns non-2xx cu `Error('request failed: <path> (<status>)')`.
- Parsați toate cele trei corpuri JSON și randați un model de succes care conține profilul, numărul sarcinilor deschise, numărul total și notificările.
- La orice eroare de cerere sau parsare, randați `{ state: 'error', message }` și finalizați fără o respingere netratată.
- Returnați modelul final randat pentru testare deterministă.

## Constrângeri

- ESM și `fetch` native în browser; server static și teste pe Node LTS; fără dependențe.
- Folosiți `Promise.all` pentru operațiile independente.
- Studentul nu modifică resursele, rendererul, inițializarea sau testele.
- Păstrați accesul DOM în rendererul furnizat și injectați dependențele `fetch`/render în controller.

## Criterii observabile de finalizare

- Browserul trece vizibil de la încărcare la un tablou populat din toate cele trei surse.
- Instrumentele Network arată că cele trei cereri pornesc împreună.
- O resursă lipsă produce o eroare vizibilă, nu încărcare blocată sau respingere netratată.
- Toate testele trec, iar studentul poate explica când fiecare promisiune este îndeplinită sau respinsă.

## Plan de validare

### Verificări de bază

- Fișierele statice și resursele JSON există și pot fi parsate.
- Rendererul afișează fiecare stare fără a depinde de controller.

### Verificările obiectivului

- Încărcarea precedă starea finală.
- Toate apelurile fetch sunt inițiate înainte de rezolvarea vreunui răspuns.
- Agregarea de succes este exactă.
- Erorile HTTP și JSON devin modelul de eroare cerut.

### Verificări de regresie

- Array-urile și obiectele sursă nu sunt modificate.
- Fiecare cale este preluată exact o dată.
- Controllerul nu produce respingeri netratate pentru eșecurile așteptate.

## Munca destinată studentului

După validarea referinței, copiați referința și înlocuiți numai `loadDashboard` din `public/dashboard.js` cu un TODO care randează și returnează starea de încărcare. Verificările de bază rămân verzi; verificările obiectivului și regresiile dependente de controller eșuează, iar aplicația continuă să se încarce.

## Sarcină pentru Codex

> Implementați numai `public/dashboard.js`. Porniți în paralel toate cele trei apeluri fetch native, validați `response.ok`, agregați modelul documentat, randați stările explicite loading/success/error și tratați eșecurile așteptate fără o respingere netratată. Nu modificați rendererul DOM, resursele, serverul sau testele și nu adăugați dependențe. Sarcina este finalizată când trec toate verificările. Explicați de ce cererile sunt paralele.

Studenții inspectează diferențele pentru a identifica așteptări secvențiale, erori ascunse, apeluri fetch duplicate și cuplare cu DOM-ul, apoi verifică timpii în Network și un eșec intenționat cauzat de o resursă lipsă.

## Sarcină de depanare/extensie

- Schimbați o cale către un fișier inexistent. Diagnosticați de ce `fetch` se îndeplinește pentru `404`, adăugați sau restaurați verificarea explicită `response.ok` și verificați interfața de eroare.

## În afara domeniului

- API-uri externe, autentificare, cache, politici retry/timeout, React, bundlere sau găzduire statică pentru producție.
