import React, { useState, useCallback } from 'react';
import StarBackground from './components/StarBackground';
import BirthForm from './components/BirthForm';
import ResultDisplay from './components/ResultDisplay';
import { generateAstrologyReading } from './services/geminiService';
import { BirthDetails, AstrologyReading, LoadingState } from './types';

function App() {
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [reading, setReading] = useState<AstrologyReading | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (details: BirthDetails) => {
    setStatus(LoadingState.LOADING);
    setErrorMsg(null);
    try {
      const result = await generateAstrologyReading(details);
      setReading(result);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
      setErrorMsg("The stars are cloudy right now. Please check your connection and try again.");
    }
  }, []);

  const handleReset = useCallback(() => {
    setStatus(LoadingState.IDLE);
    setReading(null);
    setErrorMsg(null);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
      <StarBackground />
      
      {/* Header - Always visible but smaller when showing results */}
      <header className={`text-center transition-all duration-700 ${status === LoadingState.SUCCESS ? 'mt-8 mb-6 scale-90' : 'mb-12 mt-0'}`}>
        <div className="inline-block p-3 rounded-full bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/30 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-violet-200 drop-shadow-[0_0_15px_rgba(165,180,252,0.5)]">
          Celestia AI
        </h1>
        <p className="mt-4 text-slate-400 text-lg md:text-xl font-light tracking-wide">
          Unveil the secrets of your natal chart & current path.
        </p>
      </header>

      <main className="w-full flex flex-col items-center justify-center z-10">
        {status === LoadingState.ERROR && (
          <div className="mb-8 p-4 bg-red-900/30 border border-red-500/50 text-red-200 rounded-lg max-w-md text-center backdrop-blur-md">
            {errorMsg}
          </div>
        )}

        {status === LoadingState.SUCCESS && reading ? (
          <ResultDisplay reading={reading} onReset={handleReset} />
        ) : (
          <div className={`transition-all duration-500 ${status === LoadingState.LOADING ? 'opacity-80 pointer-events-none' : 'opacity-100'}`}>
             <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
               <BirthForm onSubmit={handleFormSubmit} isLoading={status === LoadingState.LOADING} />
             </div>
          </div>
        )}
      </main>

      <footer className="absolute bottom-4 text-slate-600 text-sm font-light">
        Powered by Gemini • Placidus System • Tropical Zodiac
      </footer>
    </div>
  );
}

export default App;