document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const weatherData = document.getElementById("weather-data");
  const loadingIndicator = document.getElementById("loading");
  const errorMessage = document.getElementById("error");
  const forecastContainer = document.getElementById("forecast");

  // Default city on load
  const defaultCity = "Abeokuta";

  // API key
  const apiKey = "e39f663018a8ac1e50839df2acc4564f";

  // Set up search functionality
  searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const city = searchInput.value.trim();
      if (city) {
        getWeatherData(city);
      }
    }
  });

  // Function to get current weather data
  function getWeatherData(city) {
    // Show loading indicator
    weatherData.style.display = "none";
    errorMessage.style.display = "none";
    loadingIndicator.style.display = "flex";

    // Fetch current weather
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        // Display current weather
        displayCurrentWeather(data);

        // Once we have coordinates, get 5-day forecast
        const { lat, lon } = data.coord;
        return fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        // Display forecast
        displayForecast(data);

        // Show weather data
        loadingIndicator.style.display = "none";
        weatherData.style.display = "block";
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        loadingIndicator.style.display = "none";
        errorMessage.style.display = "block";
      });
  }

  // Function to display current weather
  function displayCurrentWeather(data) {
    // Get current date
    const now = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formattedDate = now.toLocaleDateString("en-US", options);

    // Set background based on weather condition and time
    setBackground(data.weather[0].main, now.getHours());

    // Update current weather elements
    document.getElementById(
      "location"
    ).textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("date").textContent = formattedDate;
    document.getElementById("temperature").innerHTML = `${Math.round(
      data.main.temp
    )}<span>°C</span>`;
    document.getElementById("description").textContent =
      data.weather[0].description;
    document.getElementById("feels-like").textContent = `${Math.round(
      data.main.feels_like
    )}°C`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind").textContent = `${Math.round(
      data.wind.speed * 3.6
    )} km/h`; // Convert m/s to km/h
    document.getElementById(
      "pressure"
    ).textContent = `${data.main.pressure} hPa`;

    // Update weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;
    document.getElementById("weather-icon").alt = data.weather[0].description;
  }

  // Function to display forecast
  function displayForecast(data) {
    forecastContainer.innerHTML = "";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get one forecast per day (at 12:00)
    const dailyForecasts = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.getDate();

      // If we don't have a forecast for this day yet, or if it's closer to noon
      if (
        !dailyForecasts[day] ||
        Math.abs(date.getHours() - 12) <
          Math.abs(dailyForecasts[day].date.getHours() - 12)
      ) {
        dailyForecasts[day] = {
          date: date,
          temp: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
      }
    });

    // Convert object to array and sort by date
    const forecastArray = Object.values(dailyForecasts);
    forecastArray.sort((a, b) => a.date - b.date);

    // Take only the first 5 days
    forecastArray.slice(0, 5).forEach((forecast) => {
      const forecastDay = forecast.date.getDay();
      const iconUrl = `https://openweathermap.org/img/wn/${forecast.icon}.png`;

      const forecastItem = document.createElement("div");
      forecastItem.className = "forecast-item";
      forecastItem.innerHTML = `
                        <div class="forecast-day">${days[forecastDay]}</div>
                        <img src="${iconUrl}" alt="${
        forecast.description
      }" class="forecast-icon">
                        <div class="forecast-temp">${Math.round(
                          forecast.temp
                        )}°C</div>
                    `;

      forecastContainer.appendChild(forecastItem);
    });
  }

  // Check if geolocation is available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Get weather by coordinates
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      (error) => {
        // Fallback to default city if geolocation fails
        console.error("Geolocation error:", error);
        getWeatherData(defaultCity);
      }
    );
  } else {
    // Fallback to default city if geolocation not supported
    getWeatherData(defaultCity);
  }

  // Function to get weather by coordinates
  function getWeatherByCoords(lat, lon) {
    // Show loading indicator
    weatherData.style.display = "none";
    errorMessage.style.display = "none";
    loadingIndicator.style.display = "flex";

    // Fetch current weather
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        // Display current weather
        displayCurrentWeather(data);

        // Get 5-day forecast
        return fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        // Display forecast
        displayForecast(data);

        // Show weather data
        loadingIndicator.style.display = "none";
        weatherData.style.display = "block";
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        loadingIndicator.style.display = "none";
        errorMessage.style.display = "block";
      });
  }
});
