import React from "react";
import { motion } from "framer-motion";


function ToggleRole({ role, setRole, primaryColor }) {
  const colorVariants = {
    blue: {
      active: "from-blue-500 to-indigo-600 ring-blue-300",
      inactive: "bg-white/80 text-gray-700"
    },
    pink: {
      active: "from-pink-500 to-rose-600 ring-pink-300",
      inactive: "bg-white/80 text-gray-700"
    }
  };
  return (
    <div className="mb-10 flex justify-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setRole("student")}
        className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg flex items-center gap-3 ${
          role === "student"
            ? `bg-gradient-to-br ${colorVariants[primaryColor].active} text-white ring-2 ring-opacity-50`
            : colorVariants[primaryColor].inactive + " hover:bg-white backdrop-blur-sm border border-gray-200"
        }`}
      >
        <motion.div 
          animate={role === "student" ? { rotate: 0 } : { rotate: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-2 bg-white/20 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </motion.div>
        Student View
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setRole("tutor")}
        className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg flex items-center gap-3 ${
          role === "tutor"
            ? `bg-gradient-to-br ${colorVariants[primaryColor].active} text-white ring-2 ring-opacity-50`
            : colorVariants[primaryColor].inactive + " hover:bg-white backdrop-blur-sm border border-gray-200"
        }`}
      >
        <motion.div 
          animate={role === "tutor" ? { rotate: 0 } : { rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-2 bg-white/20 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </motion.div>
        Tutor View
      </motion.button>
    </div>
    
  );
}

export default ToggleRole;