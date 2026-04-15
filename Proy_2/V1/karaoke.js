const audio = document.getElementById("audio");
const lyricsContainer = document.getElementById("lyrics");

let lyrics = [];

// 1. Obtener letras desde LRCLIB
async function loadLyrics() {
  const response = await fetch(
    "https://lrclib.net/api/get?track_name=Human&artist_name=The%20Killers"
  );

  const data = await response.json();

  if (!data.syncedLyrics) {
    lyricsContainer.innerText = "❌ No hay letras sincronizadas";
    return;
  }

  lyrics = parseLRC(data.syncedLyrics);
  renderLyrics();
}

// 2. Parsear LRC → [{ time, text }]
function parseLRC(lrc) {
  return lrc.split("\n").map(line => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (!match) return null;

    const minutes = parseInt(match[1]);
    const seconds = parseFloat(match[2]);

    return {
      time: minutes * 60 + seconds,
      text: match[3].trim()
    };
  }).filter(Boolean);
}

// 3. Mostrar letras en pantalla
function renderLyrics() {
  lyricsContainer.innerHTML = "";
  lyrics.forEach((line, index) => {
    const p = document.createElement("p");
    p.className = "line";
    p.id = `line-${index}`;
    p.innerText = line.text;
    lyricsContainer.appendChild(p);
  });
}

// 4. Sincronizar con el audio
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  lyrics.forEach((line, index) => {
    const nextLine = lyrics[index + 1];
    const el = document.getElementById(`line-${index}`);

    if (
      currentTime >= line.time &&
      (!nextLine || currentTime < nextLine.time)
    ) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
});

loadLyrics();