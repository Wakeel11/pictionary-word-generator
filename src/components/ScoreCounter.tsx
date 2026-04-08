import { useState } from 'react';
import { Trophy, Plus, Minus, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScoreCounter() {
  const [scores, setScores] = useState({ teamA: 0, teamB: 0 });

  const updateScore = (team: 'teamA' | 'teamB', delta: number) => {
    setScores((prev) => ({
      ...prev,
      [team]: Math.max(0, prev[team] + delta),
    }));
  };

  const resetScores = () => setScores({ teamA: 0, teamB: 0 });

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white/80">
          <Trophy size={20} />
          <span className="font-medium uppercase tracking-wider text-xs">Score Board</span>
        </div>
        <button
          onClick={resetScores}
          className="p-2 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
          title="Reset Scores"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <TeamScore
          name="Team A"
          score={scores.teamA}
          onIncrement={() => updateScore('teamA', 1)}
          onDecrement={() => updateScore('teamA', -1)}
          color="bg-blue-500"
        />
        <TeamScore
          name="Team B"
          score={scores.teamB}
          onIncrement={() => updateScore('teamB', 1)}
          onDecrement={() => updateScore('teamB', -1)}
          color="bg-pink-500"
        />
      </div>
    </div>
  );
}

interface TeamScoreProps {
  name: string;
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
  color: string;
}

function TeamScore({ name, score, onIncrement, onDecrement, color }: TeamScoreProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{name}</span>
      <div className="relative h-16 w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={score}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-4xl font-black text-white"
          >
            {score}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onDecrement}
          className="p-2 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 transition-all active:scale-90"
        >
          <Minus size={18} />
        </button>
        <button
          onClick={onIncrement}
          className={`p-2 rounded-lg ${color} text-white shadow-lg shadow-black/20 hover:brightness-110 transition-all active:scale-90`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
