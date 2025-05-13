const loader = document.getElementById("loading");
const dataDiv = document.getElementById("weather-data");
const locationtext = document.getElementById("location");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const errorDiv = document.getElementById("error");
const forecastContainer = document.getElementById("forecast");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

// API key
const apiKey = "e39f663018a8ac1e50839df2acc4564f";

//get weather from city input on clcik on the search button.
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWatherByCity(city);
  }
});

//get weather from city input on click on Enter Key
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) {
      getWatherByCity(city);
    }
  }
});

// get wather from city
async function getWatherByCity(city) {
  loader.style.display = "Flex";
  forecastContainer.innerHTML = "";
  dataDiv.style.display = "none";
  errorDiv.style.display = "none";
  try {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const body = await response.json();
    searchInput.value = "";

    if (body.cod === "404") {
      throw new Error(body.message);
    }

    setWeatherData(body);

    // console.log(body);

    //get 5 days forcast
    fiveDaysForcast(body.coord.lat, body.coord.lon);
  } catch (error) {
    console.error(error);
    forecastContainer.innerHTML = "";
    loader.style.display = "none";
    dataDiv.style.display = "none";
    errorDiv.style.display = "flex";
  }
}

// Get the waether from the browser location
navigator.geolocation.getCurrentPosition(success, error);

function success(e) {
  try {
    const { latitude, longitude } = e.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((e) => {
        setWeatherData(e);
      });

    //get 5 days forcast
    fiveDaysForcast(latitude, longitude);
  } catch (error) {
    console.error(error);
    forecastContainer.innerHTML = "";
    loader.style.display = "none";
    dataDiv.style.display = "none";
    errorDiv.style.display = "flex";
  }
}

// set the weather data

const setWeatherData = (e) => {
  //get time
  const date = new Date();

  // Set background based on weather condition and time
  setBackground(e.weather[0].main, date.getHours());

  //Set all values
  locationtext.textContent = e.name;

  weatherIcon.src = `https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`;
  weatherIcon.alt = e.weather[0].description;

  temperature.textContent = `${Math.floor(e.main.temp)}°C`;

  description.textContent = e.weather[0].description;

  feelsLike.textContent = `${Math.floor(e.main.feels_like)}°C`;
  humidity.textContent = `${Math.floor(e.main.humidity)}%`;
  wind.textContent = `${Math.floor(e.wind.speed)}km/h`;
  pressure.textContent = `${Math.floor(e.main.pressure)}hPa`;

  //hide the loading div
  loader.style.display = "none";

  //show weatehr data div
  dataDiv.style.display = "block";
  errorDiv.style.display = "none";
};

//Throw error if the borswer does not give the current location
function error() {
  console.error("error");

  //hide the loading div
  loader.style.display = "none";

  //show error  div
  dataDiv.style.display = "none";
  errorDiv.style.display = "block";
}

// get 5 days data forcast
async function fiveDaysForcast(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );

    const body = await response.json();

    const weatherList = body.list;

    //Get weatehr at 12pm
    const weatherATTwelve = weatherList.filter(
      (weatherItem) => weatherItem.dt_txt.split(" ")[1] === "12:00:00"
    );

    weatherATTwelveSorted = weatherATTwelve.sort((a, b) => a.dt - b.dt);

    weatherATTwelveSorted.forEach((forcastItem) => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      let forecastDay = new Date(forcastItem.dt * 1000);
      forecastDay = forecastDay.getDay();

      const iconUrl = `https://openweathermap.org/img/wn/${forcastItem.weather[0].icon}.png`;

      const forecastItem = document.createElement("div");
      forecastItem.className = "forecast-item";
      forecastItem.innerHTML = `
                          <div class="forecast-day">${days[forecastDay]}</div>
                          <img src="${iconUrl}" alt="${
        forcastItem.weather[0].description
      }" class="forecast-icon">
                          <div class="forecast-temp">${Math.round(
                            forcastItem.main.temp
                          )}°C</div>
                      `;

      forecastContainer.appendChild(forecastItem);
    });
  } catch (error) {
    console.error("This is an error");
  }
}

// Set background based on weather condition and time
function setBackground(weatherCondition, hour) {
  const body = document.body;
  weatherCondition = weatherCondition.toLowerCase();

  // First check if it's a special weather condition
  if (
    weatherCondition.includes("rain") ||
    weatherCondition.includes("drizzle")
  ) {
    body.style.background = "var(--rainy-gradient)";
  } else if (weatherCondition.includes("cloud")) {
    body.style.background = "var(--cloudy-gradient)";
  } else if (weatherCondition.includes("snow")) {
    body.style.background = "var(--primary-gradient)";
  } else if (weatherCondition.includes("thunder")) {
    body.style.background = "var(--night-gradient)";
  } else {
    // If no special condition, set based on time of day
    if (hour >= 5 && hour < 10) {
      // Morning
      body.style.background = "var(--morning-gradient)";
    } else if (hour >= 10 && hour < 17) {
      // Day
      body.style.background = "var(--day-gradient)";
    } else if (hour >= 17 && hour < 21) {
      // Evening
      body.style.background = "var(--evening-gradient)";
    } else {
      // Night
      body.style.background = "var(--night-gradient)";
    }
  }
}
