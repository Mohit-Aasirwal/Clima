const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  console.warn(
    "OpenWeather API key is missing. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables."
  );
}

export const weatherApi = {
  async getCurrentWeather(city: string) {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    return response.json();
  },

  async getWeatherByCoords(lat: number, lon: number) {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Location weather data not available");
    }

    return response.json();
  },

  async getForecast(city: string) {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    return response.json();
  },

  async getForecastByCoords(lat: number, lon: number) {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Location forecast data not available");
    }

    return response.json();
  },
};
