import React from 'react';
import { Chapter, Lesson, UserProgress } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  currentLessonId: string | null;
  onSelectLesson: (lesson: Lesson) => void;
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  chapters, 
  currentLessonId, 
  onSelectLesson, 
  isOpen, 
  onClose,
  progress
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed md:relative z-30 w-80 h-full bg-white border-r border-teal-100 flex flex-col shadow-xl md:shadow-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 bg-teal-600 text-white shadow-sm">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-graduation-cap"></i>
            Toán 7
          </h1>
          <p className="text-teal-100 text-sm mt-1">Chân trời sáng tạo</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-3 px-2 border-b border-teal-50 pb-1">
                {chapter.title}
              </h3>
              <div className="space-y-1">
                {chapter.lessons.map((lesson) => {
                  const lessonProgress = progress[lesson.id];
                  // Default to unlocked for the very first lesson if not in state, otherwise check state
                  // However, logic in App.tsx initializes first lesson as unlocked.
                  // For others, if not in state, they are locked.
                  const isUnlocked = lessonProgress?.isUnlocked || false;
                  const isCompleted = lessonProgress?.completed || false;
                  
                  return (
                    <button
                      key={lesson.id}
                      disabled={!isUnlocked}
                      onClick={() => {
                        onSelectLesson(lesson);
                        onClose(); 
                      }}
                      className={`
                        w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group
                        ${currentLessonId === lesson.id 
                          ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200 shadow-sm' 
                          : isUnlocked 
                            ? 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
                            : 'text-slate-400 bg-slate-50 cursor-not-allowed opacity-70'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${isUnlocked ? 'bg-teal-400' : 'bg-slate-300'}`}></span>
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      
                      {/* Icons for status */}
                      <div className="flex-shrink-0 ml-2">
                        {!isUnlocked ? (
                           <i className="fa-solid fa-lock text-slate-300 text-xs"></i>
                        ) : isCompleted ? (
                           <i className="fa-solid fa-circle-check text-green-500 text-sm"></i>
                        ) : (
                           <div className="w-4 h-4 rounded-full border-2 border-slate-200 group-hover:border-teal-300"></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
              <i className="fa-regular fa-user"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">Học sinh</p>
              <p className="text-xs text-slate-500">Tiến độ được lưu tự động</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;