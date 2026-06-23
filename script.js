async function getWeather() {
  const city = document.getElementById("city").value;

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      document.getElementById("result").innerHTML = "City not found";
      return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );

    const weatherData = await weatherResponse.json();

    document.getElementById("result").innerHTML = `
      <h2>${city}</h2>
      <p>🌡️ Temp: ${weatherData.current.temperature_2m}°C</p>
      <p>💧 Humidity: ${weatherData.current.relative_humidity_2m}%</p>
      <p>💨 Wind: ${weatherData.current.wind_speed_10m} km/h</p>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("result").innerHTML = "Something went wrong";
  }
}