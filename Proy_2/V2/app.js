const audio = document.getElementById("audio");
const lyricsContainer = document.getElementById("lyrics");
const resultsContainer = document.getElementById("results");



let lyrics = [];

//  Mapa de audios locales - tewmporalmente hace match con la api, pero en un proyecto real esto se haría con una base de datos 
const audioMap = {
    33456: "songs/Human_The Killers.wav",
    6370: "songs/Human_Cody Johnson.wav",
    975463: "songs/Paper Rings_Taylor Swift.wav",
    19780: "songs/Mr- Brightside_The Killers.wav"

};

//  Buscar canciones
async function buscar() {
  const query = document.getElementById("searchInput").value;

  if (!query) {
    alert("Escribe algo para buscar");
    return;
  }

  try {
    const response = await fetch(
      `https://lrclib.net/api/search?q=${encodeURIComponent(query)}`
    );

    const results = await response.json();

    console.log("Resultados:", results);

    renderResults(results);

  } catch (error) {
    console.error("Error:", error);
  }
}

//  Mostrar resultados
function renderResults(results) {
    

    resultsContainer.innerHTML = "";

  if (!results.length) {
    resultsContainer.innerText = "No hay resultados!!";
    return;
  }

  results.forEach(song => {
    const div = document.createElement("div");
    div.className = "song";

    const track = song.trackName || song.track_name;
    const artist = song.artistName || song.artist_name;

    div.innerHTML = `
      <strong>${track}</strong><br>
      <small>${artist}</small>
    `;

    div.onclick = () => seleccionarCancion(song);

    resultsContainer.appendChild(div);
  });
}

//  Seleccionar canción
function seleccionarCancion(song) {
  console.log("Seleccionada:", song);

  //  Letras
  if (song.syncedLyrics) {
    lyrics = parseLRC(song.syncedLyrics);
    renderLyrics();
  } else {
    lyricsContainer.innerText = "⚠️ No hay letras sincronizadas";
  }

  //  Audio
  const id = song.id;
  console.log("ID canción:", id);
  const src = audioMap[id];

  console.log("audioMap:", audioMap);
  console.log("Buscando ID:", id);
  console.log("Resultado src:", src);
  
  if (!src) {
    alert("⚠️ No hay  audio local de esta canción");
    audio.src = "";
    return;
  }

  audio.src = src;
  audio.play();
}

//  Parsear LRC
function parseLRC(lrc) {
  return lrc.split("\n").map(line => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (!match) return null;

    return {
      time: parseInt(match[1]) * 60 + parseFloat(match[2]),
      text: match[3].trim()
    };
  }).filter(Boolean);
}

//  Renderizar letras
function renderLyrics() {
  lyricsContainer.innerHTML = "";

  lyrics.forEach((line, i) => {
    const p = document.createElement("p");
    p.className = "line";
    p.id = `line-${i}`;
    p.innerText = line.text;
    lyricsContainer.appendChild(p);
  });
}

//  Sincronización
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  lyrics.forEach((line, i) => {
    const next = lyrics[i + 1];
    const el = document.getElementById(`line-${i}`);

    if (!el) return;

    if (
      currentTime >= line.time &&
      (!next || currentTime < next.time)
    ) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
});