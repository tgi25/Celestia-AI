import React, { useState } from 'react';
import { AstrologyReading } from '../types';

interface ResultDisplayProps {
  reading: AstrologyReading;
  onReset: () => void;
}

const SignCard: React.FC<{ title: string; sign: string; icon: string }> = ({ title, sign, icon }) => (
  <div className="bg-slate-800/40 border border-slate-700 p-4 rounded-xl flex flex-col items-center text-center backdrop-blur-sm">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-1">{title}</h3>
    <p className="text-xl font-serif text-indigo-300">{sign}</p>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ reading, onReset }) => {
  const [activeTab, setActiveTab] = useState<'natal' | 'current'>('natal');

  return (
    <div className="w-full max-w-4xl animate-fade-in-up">
      {/* Planetary Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <SignCard title="Sun Sign" sign={reading.sunSign} icon="☀️" />
        <SignCard title="Moon Sign" sign={reading.moonSign} icon="🌙" />
        <SignCard title="Rising Sign" sign={reading.risingSign} icon="⬆️" />
      </div>

      {/* Main Content Card */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
        
        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('natal')}
            className={`flex-1 py-4 text-center font-serif text-lg transition-colors ${
              activeTab === 'natal'
                ? 'bg-indigo-900/30 text-indigo-300 border-b-2 border-indigo-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            Natal Chart Analysis
          </button>
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-4 text-center font-serif text-lg transition-colors ${
              activeTab === 'current'
                ? 'bg-violet-900/30 text-violet-300 border-b-2 border-violet-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            Current Predictions
          </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[400px]">
          {activeTab === 'natal' ? (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-serif text-indigo-200 mb-4">Your Soul's Blueprint</h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                {reading.natalAnalysis}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-serif text-violet-200 mb-4">The Stars Right Now</h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                {reading.currentPrediction}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-4 transition-all hover:decoration-white"
        >
          Read another chart
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;