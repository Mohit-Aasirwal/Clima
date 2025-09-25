"use client";

import { motion } from "framer-motion";
import { Cloud, MapPin, Navigation } from "lucide-react";

interface LoadingIndicatorProps {
  type?: "weather" | "location";
}

export const LoadingIndicator = ({
  type = "weather",
}: LoadingIndicatorProps) => {
  if (type === "location") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Navigation className="h-16 w-16 text-blue-500 mb-4" />
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1 }}
          className="h-2 bg-gray-200 rounded-full mb-2 overflow-hidden"
        >
          <motion.div
            animate={{
              x: [-200, 200],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full bg-blue-500 rounded-full w-1/2"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-center"
        >
          <MapPin className="h-4 w-4 inline mr-2" />
          Detecting your location...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Cloud className="h-16 w-16 text-blue-500 mb-4" />
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 1 }}
        className="h-2 bg-gray-200 rounded-full mb-2 overflow-hidden"
      >
        <motion.div
          animate={{
            x: [-200, 200],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full bg-blue-500 rounded-full w-1/2"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600"
      >
        Fetching weather data...
      </motion.p>
    </motion.div>
  );
};
