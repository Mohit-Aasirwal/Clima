"use client";

import { useState, useEffect } from "react";
import { WeatherData, ForecastData, WeatherState } from "@/types/weather";
import { weatherApi } from "@/services/weatherApi";
import { storage } from "@/utils/storage";

interface LocationState {
  loading: boolean;
  error: string | null;
  permissionGranted: boolean;
}

export const useWeather = () => {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const [locationState, setLocationState] = useState<LocationState>({
    loading: false,
    error: null,
    permissionGranted: storage.getLocationPermission(),
  });

  // Get user's current location
  const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      setLocationState((prev) => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationState((prev) => ({
            ...prev,
            loading: false,
            permissionGranted: true,
          }));
          storage.setLocationPermission(true);
          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          const errorMessage =
            error.code === error.PERMISSION_DENIED
              ? "Location permission denied. Please search for a city manually."
              : "Unable to get your location. Please search for a city manually.";

          setLocationState((prev) => ({
            ...prev,
            loading: false,
            error: errorMessage,
            permissionGranted: false,
          }));
          storage.setLocationPermission(false);
          reject(new Error(errorMessage));
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
        }
      );
    });
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setWeatherState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const [currentData, forecastData] = await Promise.all([
        weatherApi.getWeatherByCoords(lat, lon),
        weatherApi.getForecastByCoords(lat, lon),
      ]);

      setWeatherState({
        current: currentData,
        forecast: forecastData,
        loading: false,
        error: null,
      });

      storage.setLastCity(currentData.name);
    } catch (error) {
      setWeatherState({
        current: null,
        forecast: null,
        loading: false,
        error: "Unable to fetch weather data for your location.",
      });
    }
  };

  // Handle manual city search
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
    } catch (error) {
      setWeatherState({
        current: null,
        forecast: null,
        loading: false,
        error: "City not found. Please try again.",
      });
      storage.clearLastCity();
    }
  };

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const coords = await getCurrentLocation();
      await fetchWeatherByCoords(coords.lat, coords.lon);
    } catch (error) {
      // Error is already handled in getCurrentLocation
    }
  };

  // Initialize weather data on component mount
  useEffect(() => {
    const initializeWeatherData = async () => {
      const lastCity = storage.getLastCity();
      const hasLocationPermission = storage.getLocationPermission();

      // Try to get location-based weather first if permission was previously granted
      if (hasLocationPermission) {
        try {
          const coords = await getCurrentLocation();
          await fetchWeatherByCoords(coords.lat, coords.lon);
          return;
        } catch (error) {
          // Fall back to last city if location fails
        }
      }

      // Use last searched city as fallback
      if (lastCity) {
        await handleSearch(lastCity);
      }
    };

    initializeWeatherData();
  }, []);

  const clearError = () => {
    setWeatherState((prev) => ({ ...prev, error: null }));
    setLocationState((prev) => ({ ...prev, error: null }));
  };

  return {
    weatherState,
    locationState,
    handleSearch,
    requestLocationPermission,
    clearError,
  };
};
