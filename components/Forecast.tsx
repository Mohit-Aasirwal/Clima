"use client";

import { ForecastData } from "@/types/weather";
import { motion } from "framer-motion";
import { AnimatedContainer } from "./AnimatedContainer";

interface ForecastProps {
  data: ForecastData;
}

export const Forecast = ({ data }: ForecastProps) => {
  const dailyForecast = data.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
      },
    },
  } as const;

  return (
    <AnimatedContainer delay={0.2}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-gray-800 mb-6"
        >
          5-Day Forecast
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dailyForecast.map((day, index) => (
            <motion.div
              key={day.dt}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-100"
            >
              <p className="font-semibold text-gray-700 mb-3">
                {formatDate(day.dt_txt)}
              </p>

              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                src={getWeatherIcon(day.weather[0].icon)}
                alt={day.weather[0].description}
                className="w-12 h-12 mx-auto mb-3"
              />

              <p className="text-lg font-bold text-gray-800 mb-1">
                {Math.round(day.main.temp)}°C
              </p>

              <p className="text-sm text-gray-600 capitalize mb-3">
                {day.weather[0].description}
              </p>

              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  💧 {day.main.humidity}%
                </span>
                <span className="flex items-center">
                  💨 {day.wind.speed}m/s
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatedContainer>
  );
};
