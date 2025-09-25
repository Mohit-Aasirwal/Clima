"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, X } from "lucide-react";

interface LocationPermissionProps {
  onGrantPermission: () => void;
  onDismiss: () => void;
  loading: boolean;
}

export const LocationPermission = ({
  onGrantPermission,
  onDismiss,
  loading,
}: LocationPermissionProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 mb-6 text-white relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Navigation className="h-8 w-8" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">Get Local Weather</h3>
                <p className="text-blue-100 text-sm">
                  Allow location access for personalized weather updates
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDismiss}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGrantPermission}
              disabled={loading}
              className="flex-1 bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Detecting Location...</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>Allow Location Access</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDismiss}
              className="px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 transition-all"
            >
              Maybe Later
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
