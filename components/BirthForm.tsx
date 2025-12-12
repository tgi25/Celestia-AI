import React, { useState } from 'react';
import { BirthDetails } from '../types';

interface BirthFormProps {
  onSubmit: (details: BirthDetails) => void;
  isLoading: boolean;
}

const BirthForm: React.FC<BirthFormProps> = ({ onSubmit, isLoading }) => {
  const [details, setDetails] = useState<BirthDetails>({
    date: '',
    time: '',
    city: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-indigo-200">
            Date of Birth
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={details.date}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="time" className="block text-sm font-medium text-indigo-200">
            Time of Birth
          </label>
          <input
            type="time"
            id="time"
            name="time"
            required
            value={details.time}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-indigo-200">
            City of Birth
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            placeholder="e.g. New York"
            value={details.city}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-indigo-200">
            Country of Birth
          </label>
          <input
            type="text"
            id="country"
            name="country"
            required
            placeholder="e.g. USA"
            value={details.country}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Consulting the Stars...
          </>
        ) : (
          <>
            <span>Reveal My Destiny</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default BirthForm;