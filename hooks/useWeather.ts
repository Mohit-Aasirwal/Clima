"use client";

import { useState, useEffect } from "react";
import { WeatherState } from "@/types/weather";
import { weatherApi } from "@/services/weatherApi";
import { storage } from "@/utils/storage";

export const useWeather = () => {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const lastCity = storage.getLastCity();
    if (lastCity) {
      handleSearch(lastCity);
    }
  }, []);

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;

    setWeatherState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const [currentData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeather(city),
        weatherApi.getForecast(city),
      ]);

      setWeatherState({
        current: currentData,
        forecast: forecastData,
        loading: false,
        error: null,
      });

      storage.setLastCity(city);
    } catch {
      setWeatherState({
        current: null,
        forecast: null,
        loading: false,
        error: "City not found. Please try again.",
      });
      storage.clearLastCity();
    }
  };

  const clearError = () => {
    setWeatherState((prev) => ({ ...prev, error: null }));
  };

  return {
    weatherState,
    handleSearch,
    clearError,
  };
};
