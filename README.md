# Glacière · landingspagina

Versie 02 · 09/11/2026 · One page website om bezoekers enthousiast te maken voor Glacière en ze te laten inschrijven op de nieuwsbrief. Volledig in code (HTML, CSS, JavaScript), klaar voor GitHub Pages. Versie 01 (01/11) blijft bewaard in `../glaciere-website/`.

## Inhoud
- `index.html` · de pagina: hero, manifest, over Glacière, collectie, waarom de nieuwsbrief, vriendenblok, inschrijfformulier, footer
- `css/style.css` · huisstijl volgens design guidelines v03 (Glacière Mauve #A86D95, DM Serif Display nooit in hoofdletters, Montserrat voor tekst en knoppen)
- `js/main.js` · scroll-animaties, vaste inschrijfknop op smartphone en het formulier naar MailerLite
- `images/` · 3 Firefly-beelden, 4 AI-productbeelden, 1 detailbeeld (Iris) en 1 deelbeeld (1200 × 630)

`index.html`, `style.css` en `main.js` volgen bewust de webconventie: GitHub Pages zoekt altijd naar `index.html`.

## MailerLite
Het formulier is al gekoppeld, er hoeft geen embed-code meer in.
- Formulier: **Glacière Newsletter Sign-up** (ID 202769197963412730), groep **Newsletter**, double opt-in aan.
- Velden: `fields[name]` (voornaam, optioneel) en `fields[email]` (verplicht), plus een toestemmingsvinkje (16+).
- Na het verzenden toont de pagina zelf de bevestiging "Bijna erbij": de bezoeker moet de inschrijving nog bevestigen in de mail van MailerLite.
- Controleer in MailerLite → Forms dat het formulier **actief / gepubliceerd** is. Doe na het publiceren één testinschrijving met je eigen adres.

## Publiceren op GitHub Pages
1. Maak op github.com een nieuwe **public** repository, bv. `glaciere`.
2. **Add file → Upload files** en sleep de **inhoud** van deze map erin (`index.html`, `README.md`, `css`, `js`, `images`). `index.html` moet in de hoofdmap staan.
3. **Commit changes**.
4. **Settings → Pages** → Branch `main`, map `/ (root)` → **Save**.
5. Na 1 à 2 minuten staat de site op `https://<gebruikersnaam>.github.io/glaciere/`.
6. Vervang daarna in `index.html` bij `og:image` het pad door de volledige URL (`https://<gebruikersnaam>.github.io/glaciere/images/20261109_Webpagina_social-preview_v01.jpg`), zodat WhatsApp en Instagram het deelbeeld tonen.
7. Zet die URL ook als link achter de knoppen in de mails van MailerLite (nu nog `#`).
