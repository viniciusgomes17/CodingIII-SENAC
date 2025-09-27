// Registro do Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("SW erro", err));
}

// Geolocalização 
document.getElementById("findCountry").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocalização não suportada.");
    return;
  }

  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude, longitude } = pos.coords;

    try {
      //país, estado, cidade
      const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`;
      const geoResp = await fetch(geoUrl);
      if (!geoResp.ok) throw new Error("Erro na API de geolocalização");
      const geoData = await geoResp.json();
      const countryName = geoData.countryName;

      //bandeira, capital, moeda, idioma
      const countryResp = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      if (!countryResp.ok) throw new Error("Erro na API de países");
      const countryData = await countryResp.json();
      const country = countryData[0];

      //Mostrar tudo
      const list = document.getElementById("countryInfo");
      list.innerHTML = `
        <li><strong>País:</strong> ${country.name.common}</li>
        <li><strong>Estado/Província:</strong> ${geoData.principalSubdivision || "N/A"}</li>
        <li><strong>Cidade:</strong> ${geoData.city || "N/A"}</li>
        <li><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</li>
        <li><strong>Moeda:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</li>
        <li><strong>Idioma(s):</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</li>
        <li><img src="${country.flags.svg}" width="120"></li>
      `;

    } catch (e) {
      alert("Erro ao buscar informações do país: " + e.message);
      console.error(e);
    }
  }, err => {
    alert("Erro ao obter localização: " + err.message);
  });
});

//câmera
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photosDiv = document.getElementById("photos");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (e) {
    alert("Não foi possível acessar a câmera.");
  }
}
startCamera();

document.getElementById("takePhoto").addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const img = document.createElement("img");
  img.src = canvas.toDataURL("image/png");
  photosDiv.appendChild(img);
});

// Modo Noturno
const toggleBtn = document.getElementById("toggleTheme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Modo Claro";
  } else {
    toggleBtn.textContent = "🌙 Modo Noturno";
  }
});

// salvamento no localStorage
localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));

// carregar ao abrir
if(localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Modo Claro";
}

