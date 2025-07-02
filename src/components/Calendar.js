import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "./BookingForm";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const hours = Array.from({ length: 9 }, (_, i) => `${9 + i}:00`);

function Calendar({ role , primaryColor}) {
  const [calendarData, setCalendarData] = useState(
    () =>
      Object.fromEntries(
        days.map(day => [
          day,
          Object.fromEntries(
            hours.map(hour => [
              hour,
              { available: true, bookedBy: null, subject: null }
            ])
          )
        ])
      )
  );

  const [bookingInfo, setBookingInfo] = useState(null);

  const handleBooking = (day, hour, name, subject) => {
    setCalendarData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [hour]: { available: false, bookedBy: name, subject }
      }
    }));
    setBookingInfo(null);
  };

  return (
    <div className="relative">
      
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
                <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-black/20">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Time
                  </div>
                </th>
                {days.map(day => (
                  <th key={day} className="px-6 py-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-black/20 last:border-r-0">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {hours.map((hour, hourIndex) => (
                <tr key={hour} className={hourIndex % 2 === 0 ? "bg-white/10" : "bg-white/5"}>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-white/20">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                      {hour}
                    </div>
                  </td>
                  {days.map(day => {
                    const slot = calendarData[day][hour];
                    return (
                      <td key={day} className="px-6 py-5 whitespace-nowrap text-sm border-r border-white/20 last:border-r-0">
                        {slot.available ? (
                          role === "student" ? (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              
                              className={`w-full bg-gradient-to-r from-${primaryColor}-600 to-${primaryColor}-500 hover:from-${primaryColor}-400 hover:to-${primaryColor}-500 text-black font-medium py-3 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2`}
  onClick={() => setBookingInfo({ day, hour })}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Book Now
                            </motion.button>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-500 border border-pink-200">
                                Available
                              </span>
                              <motion.button 
                                whileHover={{ scale: 1.05 }}
                                className="mt-2 text-xs text-red-600 hover:text-pink-500 font-medium"
                                onClick={() => setCalendarData(prev => ({
                                  ...prev,
                                  [day]: {
                                    ...prev[day],
                                    [hour]: { ...prev[day][hour], available: false }
                                  }
                                }))}
                              >
                                Mark as Busy
                              </motion.button>
                            </div>
                          )
                        ) : (
                          <motion.div 
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-500 shadow-inner"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-300 text-red-600 border border-red-300">
                                Booked
                              </span>
                              {role === "tutor" && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => setCalendarData(prev => ({
                                    ...prev,
                                    [day]: {
                                      ...prev[day],
                                      [hour]: { ...prev[day][hour], available: true, bookedBy: null, subject: null }
                                    }
                                  }))}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </motion.button>
                              )}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                                {slot.bookedBy}
                              </h4>
                              <p className="text-sm text-gray-600 italic flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                {slot.subject}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {bookingInfo && (
          <BookingForm
            day={bookingInfo.day}
            hour={bookingInfo.hour}
            onSubmit={handleBooking}
            onClose={() => setBookingInfo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Calendar;