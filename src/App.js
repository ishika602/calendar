
import React, { useState } from "react";
import { motion } from "framer-motion";
import Calendar from "./components/Calendar";
import ToggleRole from "./components/ToggleRole";

function App() {
  const [role, setRole] = useState("student");

  
  const colorSchemes = {
    student: {
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
      textGradient: "from-blue-600 to-indigo-600",
      blob1: "bg-blue-200",
      blob2: "bg-indigo-200",
      blob3: "bg-purple-200",
      primary: "blue",
    },
    tutor: {
      bgGradient: "from-pink-50 via-rose-50 to-fuchsia-50",
      textGradient: "from-pink-600 to-rose-600",
      blob1: "bg-pink-200",
      blob2: "bg-rose-200",
      blob3: "bg-fuchsia-200",
      primary: "pink",
    },
  };

  const currentScheme = colorSchemes[role];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentScheme.bgGradient} p-4 md:p-8 relative overflow-hidden transition-colors duration-500`}>
      
      <div className={`fixed -top-20 -left-20 w-96 h-96 ${currentScheme.blob1} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
      <div className={`fixed top-1/4 -right-20 w-96 h-96 ${currentScheme.blob2} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>
      <div className={`fixed bottom-1/4 -left-10 w-96 h-96 ${currentScheme.blob3} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-7000`}></div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${currentScheme.textGradient}`}>
            Tutor Scheduling System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {role === "student" 
              ? "Book personalized learning sessions with our expert educators"
              : "Manage your teaching schedule and student appointments"}
          </p>
        </motion.div>
        
        <ToggleRole role={role} setRole={setRole} primaryColor={currentScheme.primary} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12"
        >
          <Calendar role={role} primaryColor={currentScheme.primary} />
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-7000 { animation-delay: 7s; }
      `}</style>
    </div>
  );
}

export default App;