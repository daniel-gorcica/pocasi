function ziskejStav(kod, jeDen) {
    let pozadi = jeDen === 1 ? "pocasi-jasno" : "pocasi-noc";

    // 1, 2, 3 = Polojasno až Zataženo
    if (kod >= 1 && kod <= 3) {
        pozadi = jeDen === 1 ? "pocasi-oblacno" : "pocasi-noc";
        return { text: kod === 3 ? "Zataženo" : "Oblačno", ikona: "zatazeno", pozadi: pozadi };
    }

    // 45, 48 = Mlha
    if (kod >= 45 && kod <= 48) {
        pozadi = jeDen === 1 ? "pocasi-oblacno" : "pocasi-noc";
        return { text: "Mlha", ikona: "zatazeno", pozadi: pozadi };
    }

    // Déšť, přeháňky, bouřky, sníh
    if (kod >= 51 && kod <= 67) return { text: "Déšť", ikona: "dest", pozadi: "pocasi-dest" };
    if (kod >= 71 && kod <= 77) return { text: "Sníh", ikona: "dest", pozadi: "pocasi-dest" };
    if (kod >= 80 && kod <= 82) return { text: "Přeháňky", ikona: "dest", pozadi: "pocasi-dest" };
    if (kod >= 95) return { text: "Bouřka", ikona: "dest", pozadi: "pocasi-dest" };

    // Jasno (0) a cokoliv ostatního
    return { text: "Jasno", ikona: "slunce", pozadi: pozadi };
}

const svgIkony = {
    slunce: `<svg class="ikona-svg slunce-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    zatazeno: `<svg class="ikona-svg zatazeno-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path></svg>`,
    dest: `<svg class="ikona-svg dest-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path><line x1="8" y1="19" x2="8" y2="21" class="kapka"></line><line x1="12" y1="19" x2="12" y2="22" class="kapka"></line><line x1="16" y1="19" x2="16" y2="21" class="kapka"></line></svg>`
};

const vstupMesto = document.getElementById('vstup-mesto');
const tlacitkoHledat = document.getElementById('tlacitko-hledat');

async function najdiMesto(dotaz) {
    let url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(dotaz)}&count=1&language=cs&format=json`;
    let odpoved = await fetch(url);
    let data = await odpoved.json();

    if (!data.results || data.results.length === 0) {
        const bezDiakritiky = dotaz.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(bezDiakritiky)}&count=1&language=cs&format=json`;
        odpoved = await fetch(url);
        data = await odpoved.json();
    }
    return data;
}

async function nactiMesto(nazevMesta) {
    document.getElementById('nazev-mesta').innerText = "Hledám...";
    document.getElementById('stav').innerText = "Načítám...";
    document.getElementById('ikona-pocasi').innerHTML = '';

    try {
        const geoData = await najdiMesto(nazevMesta);
        if (!geoData.results || geoData.results.length === 0) {
            document.getElementById('nazev-mesta').innerText = "Nenalezeno";
            document.getElementById('stav').innerText = "Zkus jiné město";
            return;
        }

        const mesto = geoData.results[0];
        const lat = mesto.latitude;
        const lon = mesto.longitude;
        const nazev = mesto.name;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
        const odpoved = await fetch(url);
        const data = await odpoved.json();

        if (data.error) throw new Error("API selhalo.");

        const aktualni = data.current;
        const jeDen = aktualni.is_day;
        const stavInfo = ziskejStav(aktualni.weather_code, jeDen);

        document.body.className = stavInfo.pozadi;
        document.getElementById('nazev-mesta').innerText = nazev;
        document.getElementById('teplota').innerHTML = `${Math.round(aktualni.temperature_2m)}<span>°C</span>`;
        document.getElementById('stav').innerText = stavInfo.text;
        document.getElementById('ikona-pocasi').innerHTML = svgIkony[stavInfo.ikona];

        document.getElementById('pocitova-teplota').innerText = aktualni.apparent_temperature != null ? `${Math.round(aktualni.apparent_temperature)} °C` : '--';
        document.getElementById('srazky').innerText = aktualni.precipitation != null ? `${aktualni.precipitation} mm` : '--';
        document.getElementById('vitr').innerText = aktualni.wind_speed_10m != null ? `${Math.round(aktualni.wind_speed_10m)} km/h` : '--';
        document.getElementById('vlhkost').innerText = aktualni.relative_humidity_2m != null ? `${aktualni.relative_humidity_2m} %` : '--';
        document.getElementById('tlak').innerText = aktualni.surface_pressure != null ? `${Math.round(aktualni.surface_pressure)} hPa` : '--';

        if (data.daily && data.daily.sunrise && data.daily.sunset) {
            document.getElementById('vychod-slunce').innerText = data.daily.sunrise[0].split('T')[1];
            document.getElementById('zapad-slunce').innerText = data.daily.sunset[0].split('T')[1];
        }

        if (data.hourly && data.hourly.uv_index) {
            const aktuálníČasVMeste = data.current.time.substring(0, 13);
            const uvIndex = data.hourly.time.findIndex(t => t.startsWith(aktuálníČasVMeste));
            if (uvIndex !== -1 && data.hourly.uv_index[uvIndex] != null) {
                document.getElementById('uv-index').innerText = Math.round(data.hourly.uv_index[uvIndex]);
            } else {
                document.getElementById('uv-index').innerText = '--';
            }
        }

        if (data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_min) {
            document.getElementById('minimax').innerText = `H: ${Math.round(data.daily.temperature_2m_max[0])}° L: ${Math.round(data.daily.temperature_2m_min[0])}°`;
        }

        try {
            const hodinyContainer = document.getElementById('hodiny');
            hodinyContainer.innerHTML = '';
            if (data.hourly && data.hourly.time) {
                const aktuálníČasVMeste = data.current.time.substring(0, 13);
                let startIndex = data.hourly.time.findIndex(t => t.startsWith(aktuálníČasVMeste));
                if (startIndex === -1) startIndex = 0;

                for (let i = 1; i <= 5; i++) {
                    const idx = startIndex + i;
                    if (data.hourly.time[idx]) {
                        const cas = data.hourly.time[idx].split('T')[1];
                        const teplotaH = Math.round(data.hourly.temperature_2m[idx]);
                        const stavH = ziskejStav(data.hourly.weather_code[idx], 1);
                        const ikonaH = stavH.ikona === 'slunce' ? '☀️' : (stavH.ikona === 'dest' ? '🌧️' : '☁️');
                        hodinyContainer.innerHTML += `
                            <div class="hodina">
                                <span>${cas}</span>
                                <div class="ikona-mala">${ikonaH}</div>
                                <strong>${teplotaH}°</strong>
                            </div>
                        `;
                    }
                }
            }
        } catch (e) { console.warn("Chyba v hodinách", e); }

        try {
            const dnyContainer = document.getElementById('dny');
            dnyContainer.innerHTML = '';
            const dnyVTydnu = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
            if (data.daily && data.daily.time) {
                for (let i = 1; i <= 4; i++) {
                    if (data.daily.time[i]) {
                        const castiData = data.daily.time[i].split('-');
                        const datum = new Date(castiData[0], castiData[1] - 1, castiData[2], 12, 0, 0);
                        const nazevDne = i === 1 ? "Zítra" : dnyVTydnu[datum.getDay()];
                        const maxT = data.daily.temperature_2m_max[i] != null ? Math.round(data.daily.temperature_2m_max[i]) : '--';
                        const minT = data.daily.temperature_2m_min[i] != null ? Math.round(data.daily.temperature_2m_min[i]) : '--';
                        const stavD = ziskejStav(data.daily.weather_code[i], 1);
                        const ikonaD = stavD.ikona === 'slunce' ? '☀️' : (stavD.ikona === 'dest' ? '🌧️' : '☁️');
                        dnyContainer.innerHTML += `
                            <div class="den">
                                <span>${nazevDny}</span>
                                <div class="ikona-mala">${ikonaD}</div>
                                <div class="teploty"><strong>${maxT}°</strong> <span>${minT}°</span></div>
                            </div>
                        `;
                    }
                }
            }
        } catch (e) { console.warn("Chyba ve dnech", e); }

    } catch (chyba) {
        console.error("Hlavní chyba:", chyba);
        document.getElementById('nazev-mesta').innerText = "Chyba";
        document.getElementById('stav').innerText = "Zkus to znovu";
        document.getElementById('ikona-pocasi').innerHTML = '';
    }
}

tlacitkoHledat.addEventListener('click', () => nactiMesto(vstupMesto.value.trim()));
vstupMesto.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') nactiMesto(vstupMesto.value.trim());
});
window.addEventListener('DOMContentLoaded', () => {
    vstupMesto.value = "Opava";
    nactiMesto("Opava");
});