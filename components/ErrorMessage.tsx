"use client";

import { AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
      >
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
          </motion.div>
          <span>{message}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-3 right-3 text-red-700 hover:text-red-900 transition-colors"
        >
          <X className="h-4 w-4" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
