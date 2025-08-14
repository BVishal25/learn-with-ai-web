import React, { useState, useMemo } from 'react';
import { Topic, Lesson, SubLesson, MicroLesson, ModuleLevel } from '../types';
import LessonView from './LessonView';
import { CURRICULUM_DATA } from '../data/curriculum';
import { useProgress } from '../hooks/useProgress';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface LearnViewProps {
  selectedMicroLesson: MicroLesson | null;
  setSelectedMicroLesson: (lesson: MicroLesson | null) => void;
}

const LearnView: React.FC<LearnViewProps> = ({ selectedMicroLesson, setSelectedMicroLesson }) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(CURRICULUM_DATA[0]);
  const { completedMicroLessons, toggleMicroLessonComplete } = useProgress();
  const [openLessons, setOpenLessons] = useState<Set<string>>(new Set());
  const [openSubLessons, setOpenSubLessons] = useState<Set<string>>(new Set());
  const [selectedLessonPath, setSelectedLessonPath] = useState<string>('');

  const handleSelectMicroLesson = (microLesson: MicroLesson, lesson: Lesson, subLesson: SubLesson, topic: Topic) => {
    setSelectedMicroLesson(microLesson);
    const path = `${topic.title} / ${lesson.title} / ${subLesson.title} / ${microLesson.title}`;
    setSelectedLessonPath(path);
  };
  
  const allMicroLessonsInTopic = useMemo(() => {
    if (!selectedTopic) return [];
    return selectedTopic.lessons.flatMap(l => l.subLessons.flatMap(sl => sl.microLessons));
  }, [selectedTopic]);

  const currentLessonIndex = useMemo(() => {
    if (!selectedMicroLesson) return -1;
    return allMicroLessonsInTopic.findIndex(ml => ml.id === selectedMicroLesson.id);
  }, [selectedMicroLesson, allMicroLessonsInTopic]);
  
  const hasNext = currentLessonIndex !== -1 && currentLessonIndex < allMicroLessonsInTopic.length - 1;
  const hasPrevious = currentLessonIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      // We need to find the full context for the next lesson to build its path
      const nextMicroLesson = allMicroLessonsInTopic[currentLessonIndex + 1];
      for (const lesson of selectedTopic!.lessons) {
        for (const subLesson of lesson.subLessons) {
          if (subLesson.microLessons.some(ml => ml.id === nextMicroLesson.id)) {
            handleSelectMicroLesson(nextMicroLesson, lesson, subLesson, selectedTopic!);
            return;
          }
        }
      }
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      // We need to find the full context for the previous lesson to build its path
      const prevMicroLesson = allMicroLessonsInTopic[currentLessonIndex - 1];
       for (const lesson of selectedTopic!.lessons) {
        for (const subLesson of lesson.subLessons) {
          if (subLesson.microLessons.some(ml => ml.id === prevMicroLesson.id)) {
            handleSelectMicroLesson(prevMicroLesson, lesson, subLesson, selectedTopic!);
            return;
          }
        }
      }
    }
  };

  const handleBackToLessons = () => {
    setSelectedMicroLesson(null);
    setSelectedLessonPath('');
  };

  const toggleLessonOpen = (lessonId: string) => {
    setOpenLessons(prev => {
        const newSet = new Set(prev);
        if (newSet.has(lessonId)) {
            newSet.delete(lessonId);
        } else {
            newSet.add(lessonId);
        }
        return newSet;
    });
  };
  
  const toggleSubLessonOpen = (subLessonId: string) => {
    setOpenSubLessons(prev => {
        const newSet = new Set(prev);
        if (newSet.has(subLessonId)) {
            newSet.delete(subLessonId);
        } else {
            newSet.add(subLessonId);
        }
        return newSet;
    });
  };

  const getTopicProgress = (topic: Topic) => {
    const allMicroLessons = topic.lessons.flatMap(l => l.subLessons.flatMap(sl => sl.microLessons));
    if (allMicroLessons.length === 0) return 0;
    const completed = allMicroLessons.filter(ml => completedMicroLessons.has(ml.id)).length;
    return Math.round((completed / allMicroLessons.length) * 100);
  };

  const groupLessonsByLevel = (lessons: Lesson[]) => {
      const levels: ModuleLevel[] = ['Foundations', 'Beginner', 'Intermediate', 'Advanced'];
      const grouped = lessons.reduce((acc, lesson) => {
          (acc[lesson.level] = acc[lesson.level] || []).push(lesson);
          return acc;
      }, {} as Record<ModuleLevel, Lesson[]>);
      
      const orderedGroup: {level: ModuleLevel, lessons: Lesson[]}[] = [];
      levels.forEach(level => {
          if (grouped[level]) {
              orderedGroup.push({ level, lessons: grouped[level]});
          }
      });
      return orderedGroup;
  };
    
  if (selectedMicroLesson && selectedTopic) {
      return (
          <LessonView 
            key={selectedMicroLesson.id}
            lesson={selectedMicroLesson} 
            topicTitle={selectedTopic.title}
            lessonPath={selectedLessonPath}
            isCompleted={completedMicroLessons.has(selectedMicroLesson.id)}
            onToggleComplete={toggleMicroLessonComplete}
            onBack={handleBackToLessons}
            onNext={handleNext}
            onPrevious={handlePrevious}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
           />
      );
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
        <h1 className="text-4xl font-black tracking-tight text-brand-light sm:text-5xl mb-8">
            Your <span className="text-brand-accent">Learning Path</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Topic Selection */}
            <div className="md:col-span-1 lg:col-span-1 space-y-4">
                {CURRICULUM_DATA.map(topic => (
                    <button key={topic.id} onClick={() => setSelectedTopic(topic)} className={`w-full p-4 rounded-lg text-left transition-all ${selectedTopic?.id === topic.id ? 'bg-brand-accent text-brand-primary shadow-lg' : 'bg-brand-secondary hover:bg-slate-700/50 border border-slate-700'}`}>
                        <div className="flex items-center space-x-3">
                            <topic.icon className="h-6 w-6"/>
                            <span className="font-bold">{topic.title}</span>
                        </div>
                         <div className="w-full bg-slate-600 rounded-full h-1.5 mt-3">
                            <div className="bg-brand-accent h-1.5 rounded-full" style={{width: `${getTopicProgress(topic)}%`}}></div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Lessons and SubLessons */}
            <div className="md:col-span-3 lg:col-span-4">
                {selectedTopic ? (
                    <div className="animate-slide-in">
                        <h2 className="text-3xl font-bold mb-2">{selectedTopic.title}</h2>
                        <p className="text-brand-muted mb-6">{selectedTopic.description}</p>
                        <div className="space-y-8">
                            {groupLessonsByLevel(selectedTopic.lessons).map(({ level, lessons }) => (
                                <div key={level}>
                                    <h3 className="text-2xl font-bold border-b-2 border-slate-700 pb-2 mb-4 text-brand-accent">{level}</h3>
                                    <div className="space-y-4">
                                        {lessons.map(lesson => {
                                             const isLessonOpen = openLessons.has(lesson.id);
                                             return (
                                                <div key={lesson.id} className="bg-brand-secondary rounded-xl border border-slate-700 overflow-hidden transition-all duration-300">
                                                    <button onClick={() => toggleLessonOpen(lesson.id)} className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-700/50">
                                                        <div>
                                                            <h4 className="text-xl font-bold text-brand-accent mb-1">{lesson.title}</h4>
                                                            <p className="text-brand-muted">{lesson.description}</p>
                                                        </div>
                                                        <ChevronDownIcon className={`h-6 w-6 text-brand-muted transition-transform duration-300 flex-shrink-0 ml-4 ${isLessonOpen ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    
                                                    {isLessonOpen && (
                                                         <div className="px-6 pb-6 animate-fade-in">
                                                            <div className="space-y-3 border-t border-slate-700/50 pt-4">
                                                                {lesson.subLessons.map(subLesson => {
                                                                    const isSubLessonOpen = openSubLessons.has(subLesson.id);
                                                                    return (
                                                                        <div key={subLesson.id} className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                                                                            <button onClick={() => toggleSubLessonOpen(subLesson.id)} className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-800/60">
                                                                                <span className="font-semibold">{subLesson.title}</span>
                                                                                <ChevronDownIcon className={`h-5 w-5 text-brand-muted transition-transform duration-300 flex-shrink-0 ml-4 ${isSubLessonOpen ? 'rotate-180' : ''}`} />
                                                                            </button>
                                                                            {isSubLessonOpen && (
                                                                                <div className="px-4 pb-4 animate-fade-in">
                                                                                     <div className="space-y-2 border-t border-slate-600 pt-3">
                                                                                        {subLesson.microLessons.map(microLesson => (
                                                                                            <button key={microLesson.id} onClick={() => handleSelectMicroLesson(microLesson, lesson, subLesson, selectedTopic)} className="w-full flex items-center justify-between p-3 bg-brand-primary rounded-md hover:bg-slate-900 border border-slate-700 transition-colors">
                                                                                                <span className="font-medium text-left text-sm">{microLesson.title}</span>
                                                                                                {completedMicroLessons.has(microLesson.id) && <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />}
                                                                                            </button>
                                                                                        ))}
                                                                                     </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                })}
                                                                {lesson.subLessons.length === 0 && <p className="text-brand-muted">Sub-lessons coming soon!</p>}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                             )
                                        })}
                                    </div>
                                </div>
                            ))}
                             {selectedTopic.lessons.length === 0 && <div className="text-center py-10 bg-brand-secondary rounded-xl border border-slate-700"><p className="text-brand-muted">No lessons available for this topic yet. Check back soon!</p></div>}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-brand-muted">
                        <p>Select a topic to begin your journey.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default LearnView;