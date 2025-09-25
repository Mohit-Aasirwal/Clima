"use client";

import { WeatherData } from "@/types/weather";
import { Thermometer, Droplets, Wind, Navigation, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedContainer } from "./AnimatedContainer";

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatedContainer>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-xl shadow-lg p-6 mb-6 overflow-hidden"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-start mb-6"
        >
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                {data.name}, {data.sys.country}
              </h2>
            </div>
            <p className="text-gray-600 capitalize text-lg">
              {data.weather[0].description}
            </p>
          </div>
          <motion.img
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
        </motion.div>

        {/* Weather Metrics Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg"
          >
            <div className="p-2 bg-blue-500 rounded-lg">
              <Thermometer className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-xl font-semibold text-gray-800">
                {Math.round(data.main.temp)}°C
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg"
          >
            <div className="p-2 bg-green-500 rounded-lg">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-xl font-semibold text-gray-800">
                {data.main.humidity}%
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg"
          >
            <div className="p-2 bg-yellow-500 rounded-lg">
              <Wind className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-xl font-semibold text-gray-800">
                {data.wind.speed} m/s
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg"
          >
            <div className="p-2 bg-purple-500 rounded-lg">
              <Navigation className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Feels Like</p>
              <p className="text-xl font-semibold text-gray-800">
                {Math.round(data.main.feels_like)}°C
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatedContainer>
  );
};
