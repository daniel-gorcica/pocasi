# AI citace a použité zdroje

## Informace o projektu

- **Název:** Počasí – Dashboard
- **Autor:** Daniel Gorčica
- **Rok vytvoření:** 2026
- **Typ:** Responzivní webová aplikace
- **Technologie:** HTML5, CSS3, JavaScript, SVG, Open-Meteo API
- **Webová stránka:** https://daniel-gorcica.github.io/pocasi/

## Použité AI nástroje

### GitHub Copilot v prostředí Visual Studio Code

- **Nástroj:** AI assistant using Copilot SDK in VS Code
- **Datum použití:** říjen 2026
- **Rozsah použití:**
  - návrhy a úpravy responzivního rozložení pomocí CSS Grid a media queries,
  - oprava chyby v denní předpovědi (`nazevDny` místo `nazevDne`),
  - doplnění aktuálního data a času,
  - doplnění načítání počasí podle polohy zařízení,
  - doplnění pravděpodobnosti srážek,
  - sjednocení ikon předpovědi pomocí SVG,
  - optimalizace animace deště,
  - návrh a úprava levé vysouvací bubliny s ikonami,
  - doplnění oblíbených měst pomocí `localStorage`,
  - doplnění panelu nastavení,
  - přepínání jednotek teploty mezi °C a °F,
  - přepínání jednotek rychlosti větru mezi km/h a mph,
  - světlý režim,
  - zapnutí a vypnutí animovaného pozadí,
  - automatické obnovování počasí,
  - vymazání uložených oblíbených měst,
  - kontrola změn pomocí prohlížeče a kontroly formátu souborů.

### Claude (Anthropic)

- **URL:** https://claude.ai
- **Datum použití:** 2026
- **Rozsah použití v dřívější fázi projektu:**
  - konzultace návrhu dashboardu a glassmorphism vzhledu,
  - návrh CSS animací mraků, deště, slunce a noční oblohy,
  - vysvětlení použití `async/await` a `fetch`,
  - pomoc s napojením na API a ošetřením chyb,
  - návrh logiky změny pozadí podle počasí a denní doby.

## Ukázky použitých promptů

Níže jsou uvedeny příklady zadání, která byla použita při práci s AI:

1. „Udělej tu stránku responzivní.“
2. „Máš nějaké nápady na úpravu?“
3. „Vždycky se mě zeptej na jedno a já řeknu ano ne.“
4. „Tady je chyba a uprav barvy faviconu do tématiky.“
5. „Déšť se trochu seká.“
6. „Nějaký tip na side menu na levo?“
7. „Chci aby úplně na kraji to bylo v jedné bublině pod sebou a otevřela se celá bublina při najetí.“
8. „Do toho levého bubliny dej ještě ⭐ Oblíbená města a ⚙️ Nastavení.“
9. „A co do nastavení?“
10. „Všechno.“
11. „Ikony dej doprostřed.“
12. „Teď vše dej do AI-Citace co tam má být napsané.“
13. „Tohle je ještě moc velké a od teď hned zapisuj do AI-Citace.“

Prompty sloužily jako zadání pro návrh, úpravu, ladění a dokumentaci aplikace. Výsledný kód byl následně kontrolován a upravován podle požadovaného vzhledu a chování projektu.

## Použité externí zdroje

### Open-Meteo

- **Geocoding API:** https://geocoding-api.open-meteo.com/
- **Forecast API:** https://open-meteo.com/en/docs
- **Využití:** vyhledávání měst, aktuální počasí, hodinová předpověď, denní předpověď, UV index, východ a západ slunce a pravděpodobnost srážek.
- **Přístup:** API je v projektu používáno prostřednictvím JavaScriptu pomocí funkce `fetch()`.

### MDN Web Docs

- **Web Storage API:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- **Geolocation API:** https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- **Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Využití:** ověření principů ukládání oblíbených měst, geolokace zařízení a načítání dat z API.

### Validátory W3C

- **HTML validátor:** https://validator.w3.org/
- **CSS validátor:** https://jigsaw.w3.org/css-validator/
- **Využití:** kontrola syntaktické správnosti HTML a CSS.

## Co vytvořil autor

- základní koncept aplikace a její vizuální styl,
- výběr zobrazovaných údajů o počasí,
- výběr rychlých měst,
- návrh barev, ikon a atmosférických scén,
- propojení jednotlivých částí aplikace,
- rozhodnutí o funkcích oblíbených měst a nastavení,
- kontrola výsledného vzhledu v prohlížeči,
- testování vyhledávání, geolokace a responzivního zobrazení,
- kontrola a schválení všech finálních úprav.

## Aktuální funkce aplikace

- vyhledávání města a načtení počasí,
- vyhledávání pomocí klávesy Enter,
- načtení počasí podle aktuální polohy,
- aktuální teplota, pocitová teplota, srážky, vítr, vlhkost a tlak,
- hodinová a čtyřdenní předpověď,
- pravděpodobnost srážek,
- východ a západ slunce,
- UV index,
- animované pozadí podle aktuálního počasí,
- responzivní zobrazení pro počítač, tablet i mobil,
- oblíbená města uložená v prohlížeči,
- nastavení jednotek, vzhledu, animací a automatického obnovování.

## Prohlášení

Tento projekt vznikl s využitím AI jako podpůrného nástroje pro návrh, vysvětlení, ladění a kontrolu kódu. AI nebyla použita jako náhrada autora. Autor vybral výsledné řešení, upravil ho podle požadovaného vzhledu, otestoval chování aplikace a odpovídá za finální podobu projektu.

---

*Dokument aktualizován: 21. 10. 2026*
