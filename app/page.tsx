"use client";

import { useWeather } from "@/hooks/useWeather";
import { SearchBar } from "@/components/Searchbar";
import { CurrentWeather } from "@/components/CurrentWeather";
import { Forecast } from "@/components/Forecast";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LocationPermission } from "@/components/LocationPermission";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    weatherState,
    locationState,
    handleSearch,
    requestLocationPermission,
    clearError,
  } = useWeather();
  const [showLocationBanner, setShowLocationBanner] = useState(false);

  // Show location banner if no data exists and location permission wasn't previously granted
  useEffect(() => {
    if (
      !weatherState.current &&
      !locationState.permissionGranted &&
      !locationState.loading &&
      !weatherState.loading &&
      !locationState.error
    ) {
      const timer = setTimeout(() => {
        setShowLocationBanner(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [weatherState.current, locationState, weatherState.loading]);

  const handleGrantPermission = async () => {
    setShowLocationBanner(false);
    await requestLocationPermission();
  };

  const handleDismissLocationBanner = () => {
    setShowLocationBanner(false);
    // Don't show again in this session
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  } as const;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 py-8"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Weather Forecast
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg"
          >
            {weatherState.current
              ? `Weather for ${weatherState.current.name}, ${weatherState.current.sys.country}`
              : "Get current weather and 5-day forecast for your location"}
          </motion.p>
        </motion.header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <SearchBar onSearch={handleSearch} loading={weatherState.loading} />
        </motion.div>

        <AnimatePresence mode="wait">
          {showLocationBanner && !weatherState.current && (
            <LocationPermission
              onGrantPermission={handleGrantPermission}
              onDismiss={handleDismissLocationBanner}
              loading={locationState.loading}
            />
          )}
          {locationState.error && (
            <ErrorMessage message={locationState.error} onClose={clearError} />
          )}
          {weatherState.error && (
            <ErrorMessage message={weatherState.error} onClose={clearError} />
          )}
          {(weatherState.loading || locationState.loading) && (
            <LoadingIndicator
              type={locationState.loading ? "location" : "weather"}
            />
          )}
          {weatherState.current && !weatherState.loading && (
            <motion.div
              key="weather-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CurrentWeather data={weatherState.current} />
              {weatherState.forecast && (
                <Forecast data={weatherState.forecast} />
              )}

              {/* Current location indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-6"
              >
                <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Showing weather for your current location</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Empty state - no data, no loading, no errors */}
          {!weatherState.current &&
            !weatherState.loading &&
            !locationState.loading &&
            !weatherState.error &&
            !locationState.error &&
            !showLocationBanner && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-gray-300 text-8xl mb-6"
                >
                  ⛅
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-500 text-xl mb-2"
                >
                  Welcome to Weather Forecast
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-400"
                >
                  Allow location access or search for a city to get started
                </motion.p>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
