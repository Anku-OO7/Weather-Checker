const apiKey = '27bc6a3df2d5ac86614668cab607db2d';
const button = document.getElementById('getWeather');
const weatherResult = document.getElementById('weatherResult');

button.addEventListener('click', () => {
    const city = document.getElementById('city').value;
    getWeather(city);
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherResult.innerHTML = `<p>${data.message}</p>`
            }
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>Error fetching weather data.</p>`;
            console.error(error);
        });
}

function displayWeather(data) {
    const { main, wind, weather} = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const description = weather[0].description;

    weatherResult.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Description: ${description}</p>
    `;
}