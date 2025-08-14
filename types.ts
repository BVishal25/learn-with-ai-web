import React from 'react';

export interface StructuredLessonContent {
  explanation: string[];
  realLifeScenarios: string[];
  codeSnippet: {
    language: string;
    code: string;
  };
  exercises: string[];
  sources?: { title: string; uri: string; }[];
}

// A MicroLesson is the smallest, viewable piece of content.
export interface MicroLesson {
  id: string;
  title: string;
}

// A SubLesson is a collection of related MicroLessons.
export interface SubLesson {
  id: string;
  title: string;
  microLessons: MicroLesson[];
}

// A Lesson is a collection of related SubLessons.
export interface Lesson {
  id: string;
  title: string;
  level: ModuleLevel;
  description: string;
  subLessons: SubLesson[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export type ModuleLevel = 'Foundations' | 'Beginner' | 'Intermediate' | 'Advanced';

export interface Topic {
  id:string;
  title: string;
  description: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  lessons: Lesson[]; 
}

export interface GameMessage {
  role: 'user' | 'model';
  content: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    picture: string;
}

export interface Note {
  id: string;
  content: string;
  sourcePath: string;
  createdAt: number;
  updatedAt?: number;
}

export interface AIUpdateSource {
    web?: {
        uri: string;
        title: string;
    }
}

export interface AiProviderConfig {
    id: string;
    name: string;
    keyUrl: string;
}
