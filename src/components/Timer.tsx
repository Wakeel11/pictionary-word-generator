import { useState, useEffect, useCallback } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimerProps {
  initialSeconds?: number;
}

export default function Timer({ initialSeconds = 60 }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [selectedTime, setSelectedTime] = useState(initialSeconds);

  const toggle = () => setIsActive(!isActive);
  const reset = useCallback(() => {
    setSeconds(selectedTime);
    setIsActive(false);
  }, [selectedTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    setSeconds(time);
    setIsActive(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-white/80">
          <TimerIcon size={20} />
          <span className="font-medium uppercase tracking-wider text-xs">Game Timer</span>
        </div>
        <div className="flex gap-2">
          {[30, 60, 90].map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedTime === time
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {time}s
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/10"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="377"
              initial={{ strokeDashoffset: 0 }}
              animate={{
                strokeDashoffset: 377 - (377 * seconds) / selectedTime,
              }}
              transition={{ duration: 0.5, ease: "linear" }}
              className={seconds < 10 ? 'text-red-500' : 'text-yellow-400'}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={seconds}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className={`text-4xl font-black tabular-nums ${
                  seconds < 10 ? 'text-red-500' : 'text-white'
                }`}
              >
                {seconds}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggle}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all transform active:scale-95 ${
              isActive
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isActive ? <Pause size={20} /> : <Play size={20} />}
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all transform active:scale-95"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
