import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { CURRICULUM_DATA } from '../data/curriculum';
import { Topic, ModuleLevel } from '../types';

const DashboardView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { completedMicroLessons, isLoaded } = useProgress();

  const levels: ModuleLevel[] = ['Foundations', 'Beginner', 'Intermediate', 'Advanced'];

  const levelProgressData = levels.map(level => {
    const microLessonsInLevel = CURRICULUM_DATA.flatMap(t => 
      t.lessons.filter(l => l.level === level)
               .flatMap(l => l.subLessons.flatMap(sl => sl.microLessons))
    );
    const total = microLessonsInLevel.length;
    const completed = microLessonsInLevel.filter(ml => completedMicroLessons.has(ml.id)).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { level, total, completed, progress };
  }).filter(l => l.total > 0); // Only show levels that have content

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

      {/* Progress by Level */}
      <div className="bg-brand-secondary p-6 rounded-xl border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold mb-4">Progress by Level</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levelProgressData.map(({ level, completed, total, progress }) => (
            <div key={level} className="bg-brand-primary p-4 rounded-lg border border-slate-700">
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-bold text-lg text-brand-light">{level}</h3>
                <p className="text-sm font-mono text-brand-accent">{progress}%</p>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                  <div className="bg-brand-accent h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
              </div>
              <p className="text-xs text-brand-muted font-medium">{completed} / {total} lessons completed</p>
            </div>
          ))}
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
