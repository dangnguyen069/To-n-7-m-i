import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import Chatbot from './components/Chatbot';
import { textbookData } from './data';
import { Lesson, UserProgress } from './types';

const App: React.FC = () => {
  // --- Progress Management ---
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('math7_progress');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default: Unlock the very first lesson
    const initialProgress: UserProgress = {};
    const firstLessonId = textbookData[0].lessons[0].id;
    initialProgress[firstLessonId] = { score: 0, completed: false, isUnlocked: true };
    return initialProgress;
  });

  const [currentLesson, setCurrentLesson] = useState<Lesson>(textbookData[0].lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('math7_progress', JSON.stringify(progress));
  }, [progress]);

  // Flatten lessons to determine order
  const allLessons = useMemo(() => {
    return textbookData.flatMap(chapter => chapter.lessons);
  }, []);

  // Function to handle lesson completion
  const handleLessonComplete = (lessonId: string, score: number) => {
    // 1. Update current lesson status
    const isPassed = score >= 80;
    
    const newProgress = { ...progress };
    newProgress[lessonId] = {
      score: Math.max(score, newProgress[lessonId]?.score || 0), // Keep highest score
      completed: isPassed,
      isUnlocked: true
    };

    // 2. Unlock next lesson if passed
    if (isPassed) {
      const currentIndex = allLessons.findIndex(l => l.id === lessonId);
      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        const nextLessonId = allLessons[currentIndex + 1].id;
        // Only initialize if not already present to avoid overwriting existing progress
        if (!newProgress[nextLessonId]) {
           newProgress[nextLessonId] = { score: 0, completed: false, isUnlocked: true };
        } else {
           newProgress[nextLessonId].isUnlocked = true;
        }
      }
    }

    setProgress(newProgress);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        chapters={textbookData} 
        currentLessonId={currentLesson.id}
        onSelectLesson={setCurrentLesson}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        progress={progress}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-teal-100 p-4 flex items-center shadow-sm z-10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-teal-600 p-2 -ml-2 hover:bg-teal-50 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-teal-800 ml-2">Toán 7</span>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <LessonView 
            lesson={currentLesson} 
            onComplete={handleLessonComplete}
            currentScore={progress[currentLesson.id]?.score || 0}
            isCompleted={progress[currentLesson.id]?.completed || false}
          />
        </main>
      </div>

      {/* AI Chatbot Floating Widget */}
      <Chatbot />
    </div>
  );
};

export default App;