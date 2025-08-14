import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { CURRICULUM_DATA } from '../data/curriculum';
import { Topic } from '../types';

const DashboardView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { completedMicroLessons, isLoaded } = useProgress();

  const totalMicroLessons = CURRICULUM_DATA.flatMap(t => t.lessons.flatMap(l => l.subLessons.flatMap(sl => sl.microLessons))).length;
  const completedCount = completedMicroLessons.size;
  const overallProgress = totalMicroLessons > 0 ? Math.round((completedCount / totalMicroLessons) * 100) : 0;
  
  const getTopicProgress = (topic: Topic) => {
    const allMicroLessonsInTopic = topic.lessons.flatMap(l => l.subLessons.flatMap(sl => sl.microLessons));
    if (allMicroLessonsInTopic.length === 0) return 0;
    const completedInTopic = allMicroLessonsInTopic.filter(ml => completedMicroLessons.has(ml.id)).length;
    return Math.round((completedInTopic / allMicroLessonsInTopic.length) * 100);
  };
  
  if (!isLoaded) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <h1 className="text-4xl font-black tracking-tight text-brand-light sm:text-5xl mb-8">
        Welcome <span className="text-brand-accent">Back</span>
      </h1>

      {/* Overall Progress */}
      <div className="bg-brand-secondary p-6 rounded-xl border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold mb-4">Overall Progress</h2>
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-slate-700" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-brand-accent" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray={`${overallProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">{overallProgress}%</div>
          </div>
          <div>
            <p className="text-xl font-semibold">{completedCount} / {totalMicroLessons} Micro-Lessons Completed</p>
            <p className="text-brand-muted">Keep up the great work!</p>
          </div>
        </div>
      </div>

      {/* Topic Progress */}
      <div className="bg-brand-secondary p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-4">Your Progress by Topic</h2>
          <div className="space-y-4">
              {CURRICULUM_DATA.map(topic => (
                  <div key={topic.id}>
                      <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold">{topic.title}</p>
                          <p className="text-sm font-mono text-brand-accent">{getTopicProgress(topic)}%</p>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2.5">
                          <div className="bg-brand-accent h-2.5 rounded-full" style={{width: `${getTopicProgress(topic)}%`}}></div>
                      </div>
                  </div>
              ))}
          </div>
            <button onClick={() => onNavigate('learn')} className="mt-6 w-full bg-brand-accent text-brand-primary font-bold py-3 rounded-lg hover:bg-emerald-200 transition-colors">
              Continue Learning
          </button>
      </div>
    </div>
  );
};

export default DashboardView;