import React, { useState, useEffect } from "react";

function App() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert(`Time's up...!`);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500); // Wapas 25 minutes par reset
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl text-center border border-slate-700">
        <h1 className="text-3xl font-bold mb-6 text-white">Focus Timer</h1>

        {/* Timer Display */}
        <div className="text-7xl font-mono font-bold text-emerald-400 mb-8 tracking-wider">
          {formatTime(timeLeft)}
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-xl text-white font-semibold text-lg transition-all ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={resetTimer}
            className="px-8 py-3 bg-slate-700 text-white font-semibold text-lg rounded-xl hover:bg-slate-600 transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
