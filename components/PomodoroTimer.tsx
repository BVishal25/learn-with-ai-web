import React from 'react';
import { XMarkIcon } from './ui/icons';

interface PomodoroTimerProps {
  timeInSeconds: number;
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  onClose: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ timeInSeconds, isActive, onToggle, onReset, onClose }) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return (
    <div className="bg-brand-secondary p-4 rounded-xl border border-slate-700 shadow-2xl w-64 animate-fade-in">
       <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-brand-accent text-sm">Focus Session</h3>
            <button onClick={onClose} className="p-1 text-brand-muted hover:text-white" aria-label="Close timer">
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
      <div className="text-center">
        <p className="font-mono font-bold tracking-tighter text-5xl">
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      </div>
      <div className="flex justify-around mt-4">
        <button
          onClick={onToggle}
          className="px-5 py-2 text-sm bg-brand-accent text-brand-primary font-bold rounded-md hover:bg-sky-300 transition-colors"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={onReset}
          className="px-5 py-2 text-sm bg-brand-muted text-white font-bold rounded-md hover:bg-slate-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;