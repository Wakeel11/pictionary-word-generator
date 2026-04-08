import { useState, useMemo } from 'react';
import { PICTIONARY_WORDS, Word } from '../data/words';
import { RefreshCw, Copy, Check, Filter, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WordGenerator() {
  const [difficulty, setDifficulty] = useState<string>('All');
  const [category, setCategory] = useState<string>('All');
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [copied, setCopied] = useState(false);

  const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Very Hard'];
  const categories = ['All', 'Animals', 'Movies', 'Objects', 'Actions', 'Places'];

  const filteredWords = useMemo(() => {
    return PICTIONARY_WORDS.filter((word) => {
      const diffMatch = difficulty === 'All' || word.difficulty === difficulty;
      const catMatch = category === 'All' || word.category === category;
      return diffMatch && catMatch;
    });
  }, [difficulty, category]);

  const generateWord = () => {
    if (filteredWords.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    setCurrentWord(filteredWords[randomIndex]);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!currentWord) return;
    navigator.clipboard.writeText(currentWord.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-white/60 uppercase tracking-widest ml-1">
            <Layers size={14} /> Difficulty
          </label>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  difficulty === d
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-white/60 uppercase tracking-widest ml-1">
            <Filter size={14} /> Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  category === c
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Display Area */}
      <div className="relative min-h-[300px] flex flex-col items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-[2.5rem] border border-white/20 shadow-2xl p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {currentWord ? (
            <motion.div
              key={currentWord.text}
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 1.1 }}
              className="text-center z-10"
            >
              <div className="flex gap-2 justify-center mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  currentWord.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  currentWord.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  currentWord.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {currentWord.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-tighter">
                  {currentWord.category}
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-tight mb-8 break-words max-w-full">
                {currentWord.text}
              </h2>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all text-sm font-bold"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  {copied ? 'Copied!' : 'Copy Word'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center z-10"
            >
              <p className="text-white/40 font-medium text-lg italic">
                Ready to draw? Select filters and hit generate!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateWord}
        disabled={filteredWords.length === 0}
        className={`group relative w-full py-6 rounded-[2rem] font-black text-2xl tracking-tight transition-all transform active:scale-[0.98] overflow-hidden ${
          filteredWords.length === 0
            ? 'bg-white/5 text-white/20 cursor-not-allowed'
            : 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]'
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          <RefreshCw className={`transition-transform duration-500 ${currentWord ? 'group-hover:rotate-180' : ''}`} />
          {currentWord ? 'GENERATE NEXT WORD' : 'START GENERATING'}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>

      {filteredWords.length === 0 && (
        <p className="text-center text-red-400 text-xs font-bold uppercase tracking-widest">
          No words found for this combination. Try different filters!
        </p>
      )}
    </div>
  );
}
