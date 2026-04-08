/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider, Helmet } from 'react-helmet-async';
import WordGenerator from './components/WordGenerator';
import Timer from './components/Timer';
import ScoreCounter from './components/ScoreCounter';
import SEOContent from './components/SEOContent';
import SchemaMarkup from './components/SchemaMarkup';
import { PencilLine, Github, Twitter, Share2 } from 'lucide-react';

export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30">
        <Helmet>
          <title>Free Pictionary Word Generator 2026 | Easy, Hard & Adult Words</title>
          <meta name="description" content="The best Pictionary Word Generator for 2026. Instant words, difficulty filters, categories, built-in timer, and score counter. Perfect for family game nights!" />
          <meta name="keywords" content="pictionary word generator, drawing ideas, pictionary words for adults, random word generator, pictionary game tool" />
          <link rel="canonical" href="https://pictionary-generator.com" />
        </Helmet>

        <SchemaMarkup />

        {/* Header */}
        <header className="pt-12 pb-8 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            <PencilLine size={14} /> The #1 Game Tool for 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            PICTIONARY<br />GENERATOR
          </h1>
          <p className="text-white/40 max-w-lg mx-auto text-lg font-medium">
            Level up your game night with instant drawing ideas, 
            built-in timers, and score tracking.
          </p>
        </header>

        <main className="max-w-6xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Generator */}
            <div className="lg:col-span-8">
              <WordGenerator />
            </div>

            {/* Right Column: Tools */}
            <div className="lg:col-span-4 space-y-8">
              <Timer />
              <ScoreCounter />
              
              {/* Quick Share */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-xl shadow-indigo-500/20">
                <h3 className="text-xl font-black mb-2">Love this tool?</h3>
                <p className="text-white/80 text-sm mb-6">Share it with your friends and start a game night today!</p>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-sm hover:scale-105 transition-transform">
                    <Twitter size={16} /> Tweet
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black/20 text-white font-bold text-sm hover:scale-105 transition-transform">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Content Section */}
          <SEOContent />
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <PencilLine className="text-indigo-500" /> PICTIONARY.GEN
            </div>
            <div className="flex gap-8 text-white/40 text-sm font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 text-white/60 hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 text-white/60 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          <p className="text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mt-12">
            © 2026 Pictionary Word Generator. Not affiliated with Mattel.
          </p>
        </footer>
      </div>
    </HelmetProvider>
  );
}

