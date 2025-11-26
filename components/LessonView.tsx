import React, { useState, useEffect } from 'react';
import { Lesson, Exercise, SectionType, ExerciseLevel, Quiz } from '../types';
import LatexRenderer from './LatexRenderer';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (lessonId: string, score: number) => void;
  currentScore: number;
  isCompleted: boolean;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete, currentScore, isCompleted }) => {
  // Reset scroll on lesson change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pb-32">
      <header className="mb-10 border-b border-slate-200 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-teal-600 text-white rounded-lg shadow-sm">
              <i className="fa-solid fa-book-open"></i>
            </span>
            <span className="text-sm font-bold text-teal-600 tracking-wide uppercase">Toán Lớp 7</span>
          </div>
          {isCompleted && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1">
              <i className="fa-solid fa-check"></i> Đã hoàn thành ({currentScore}%)
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">{lesson.title}</h1>
      </header>

      {/* Theory Section */}
      <section className="mb-16 space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-100 rounded-lg text-teal-700">
            <i className="fa-solid fa-layer-group text-xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Kiến thức trọng tâm</h2>
        </div>
        
        <div className="grid gap-8">
          {lesson.theory.map((section, idx) => (
            <TheorySection key={idx} section={section} />
          ))}
        </div>
      </section>

      {/* Exercises Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
            <i className="fa-solid fa-pen-to-square text-xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Bài tập tự luận</h2>
        </div>
        
        <div className="grid gap-6">
          {lesson.exercises.length > 0 ? (
            lesson.exercises.map((exercise) => (
              <ExerciseItem key={exercise.id} exercise={exercise} />
            ))
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center text-slate-500">
              <i className="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
              <p>Chưa có bài tập tự luận cho bài học này.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quiz Section (Interactive) */}
      <section className="border-t-2 border-slate-100 pt-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-rose-100 rounded-lg text-rose-700">
            <i className="fa-solid fa-clipboard-check text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Trắc nghiệm kiểm tra</h2>
            <p className="text-sm text-slate-500">Hoàn thành trên 80% để mở khóa bài tiếp theo</p>
          </div>
        </div>

        {lesson.quizzes && lesson.quizzes.length > 0 ? (
           <QuizSection 
             quizzes={lesson.quizzes} 
             onComplete={(score) => onComplete(lesson.id, score)}
             previousScore={currentScore}
           />
        ) : (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-orange-800 flex items-center gap-4">
                <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                <div>
                   <p className="font-bold">Bài học này chưa có câu hỏi trắc nghiệm.</p>
                   <p className="text-sm">Hệ thống sẽ tự động ghi nhận hoàn thành khi bạn xem hết lý thuyết.</p>
                   <button 
                     onClick={() => onComplete(lesson.id, 100)}
                     className="mt-3 px-4 py-2 bg-orange-200 hover:bg-orange-300 text-orange-900 rounded-lg text-sm font-bold transition-colors"
                   >
                     Xác nhận hoàn thành
                   </button>
                </div>
            </div>
        )}
      </section>
    </div>
  );
};

// --- Sub-components ---

const TheorySection: React.FC<{ section: any }> = ({ section }) => {
  const { type, title, content, imageUrl } = section;

  // Styles based on section type
  let containerClass = "bg-white border border-slate-200";
  let headerClass = "text-slate-800 border-b border-slate-100";
  let iconClass = "text-slate-500 fa-hashtag";
  let iconBg = "bg-slate-100";

  switch (type as SectionType) {
    case 'definition':
      containerClass = "bg-blue-50 border-l-4 border-l-blue-500 border-blue-100";
      headerClass = "text-blue-800 border-blue-200";
      iconClass = "text-blue-600 fa-book";
      iconBg = "bg-white";
      break;
    case 'theorem':
      containerClass = "bg-amber-50 border-l-4 border-l-amber-500 border-amber-100";
      headerClass = "text-amber-800 border-amber-200";
      iconClass = "text-amber-600 fa-star";
      iconBg = "bg-white";
      break;
    case 'example':
      containerClass = "bg-slate-50 border-l-4 border-l-slate-400 border-slate-200";
      headerClass = "text-slate-700 border-slate-200";
      iconClass = "text-slate-600 fa-flask";
      iconBg = "bg-white";
      break;
    case 'note':
      containerClass = "bg-rose-50 border-l-4 border-l-rose-500 border-rose-100";
      headerClass = "text-rose-800 border-rose-200";
      iconClass = "text-rose-600 fa-circle-exclamation";
      iconBg = "bg-white";
      break;
  }

  return (
    <div className={`rounded-xl shadow-sm overflow-hidden ${containerClass}`}>
      <div className={`px-6 py-4 flex items-center gap-3 ${headerClass}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${iconBg}`}>
          <i className={`fa-solid ${iconClass} text-sm`}></i>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4 text-slate-700 leading-relaxed text-base">
          {content.map((paragraph: string, pIdx: number) => (
            <div key={pIdx} className="flex gap-3">
              {type !== 'example' && <i className="fa-solid fa-angle-right mt-1.5 text-xs text-slate-400"></i>}
              <div className="flex-1">
                 <LatexRenderer content={paragraph} as="div" />
              </div>
            </div>
          ))}
        </div>
        {imageUrl && (
          <div className="mt-6 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
            <img src={imageUrl} alt={title} className="w-full object-cover max-h-96" />
          </div>
        )}
      </div>
    </div>
  );
};

const getLevelBadge = (level?: ExerciseLevel) => {
  switch (level) {
    case 'Nhận biết':
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200"><i className="fa-solid fa-check mr-1"></i> Nhận biết</span>;
    case 'Thông hiểu':
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200"><i className="fa-solid fa-brain mr-1"></i> Thông hiểu</span>;
    case 'Vận dụng':
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200"><i className="fa-solid fa-bolt mr-1"></i> Vận dụng</span>;
    case 'Vận dụng cao':
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200"><i className="fa-solid fa-rocket mr-1"></i> Vận dụng cao</span>;
    default: return null;
  }
};

const ExerciseItem: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold border border-teal-100">?</div>
            <h4 className="font-bold text-slate-800">Câu hỏi</h4>
          </div>
          {getLevelBadge(exercise.level)}
        </div>
        <div className="text-slate-800 mb-6 pl-10"><LatexRenderer content={exercise.question} /></div>
        {exercise.hint && (
          <div className="mb-6 ml-10 p-4 rounded-lg bg-amber-50 border border-amber-100 text-sm text-amber-800 flex gap-3">
             <i className="fa-regular fa-lightbulb mt-0.5 text-lg"></i>
             <div><span className="font-bold block mb-1">Gợi ý:</span><LatexRenderer content={exercise.hint} as="span" /></div>
          </div>
        )}
        <div className="pl-10">
          <button onClick={() => setShowSolution(!showSolution)} className={`group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${showSolution ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-teal-600 text-white border border-teal-600 hover:bg-teal-700'}`}>
            {showSolution ? <><i className="fa-solid fa-eye-slash"></i> Ẩn lời giải</> : <><i className="fa-solid fa-key"></i> Xem lời giải</>}
          </button>
        </div>
      </div>
      {showSolution && (
        <div className="bg-gradient-to-b from-teal-50 to-white border-t border-teal-100 p-6 pl-16 animate-fadeIn">
          <h4 className="font-bold text-teal-800 mb-3 flex items-center gap-2"><i className="fa-solid fa-check-circle text-teal-600"></i> Lời giải chi tiết:</h4>
          <div className="text-slate-700 leading-relaxed bg-white p-4 rounded-lg border border-teal-100 shadow-sm"><LatexRenderer content={exercise.solution} /></div>
        </div>
      )}
    </div>
  );
};

// --- Quiz Component ---
interface QuizSectionProps {
  quizzes: Quiz[];
  onComplete: (score: number) => void;
  previousScore: number;
}

const QuizSection: React.FC<QuizSectionProps> = ({ quizzes, onComplete, previousScore }) => {
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(previousScore);

  // Reset state when quizzes change (lesson change)
  useEffect(() => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(previousScore);
  }, [quizzes, previousScore]);

  const handleSelect = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quizzes.length) {
      alert("Vui lòng trả lời hết các câu hỏi trước khi nộp bài!");
      return;
    }

    let correctCount = 0;
    quizzes.forEach(q => {
      const selectedId = answers[q.id];
      const correctOption = q.options.find(o => o.isCorrect);
      if (correctOption && selectedId === correctOption.id) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / quizzes.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);
    onComplete(calculatedScore);
  };

  const resetQuiz = () => {
    setAnswers({});
    setIsSubmitted(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-10">
       {isSubmitted && (
         <div className={`p-6 rounded-xl border-2 flex items-center gap-4 mb-6 ${score >= 80 ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${score >= 80 ? 'bg-white border-green-200 text-green-600' : 'bg-white border-red-200 text-red-600'}`}>
              {score}%
            </div>
            <div>
              <h3 className="text-xl font-bold">{score >= 80 ? 'Chúc mừng! Bạn đã vượt qua.' : 'Chưa đạt yêu cầu.'}</h3>
              <p className="text-sm opacity-80">{score >= 80 ? 'Bạn đã mở khóa bài học tiếp theo.' : 'Bạn cần đạt trên 80% để mở khóa bài tiếp theo. Hãy thử lại!'}</p>
            </div>
            {score < 80 && (
              <button onClick={resetQuiz} className="ml-auto px-4 py-2 bg-white border border-red-200 rounded-lg font-bold hover:bg-red-100 transition">
                <i className="fa-solid fa-rotate-right mr-2"></i> Làm lại
              </button>
            )}
         </div>
       )}

       {quizzes.map((quiz, index) => {
         const isCorrect = isSubmitted && quiz.options.find(o => o.isCorrect)?.id === answers[quiz.id];
         
         return (
           <div key={quiz.id} className={`bg-white rounded-xl border p-6 ${isSubmitted ? (isCorrect ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30') : 'border-slate-200 shadow-sm'}`}>
             <div className="flex gap-4">
               <span className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm">
                 {index + 1}
               </span>
               <div className="flex-1">
                 <div className="font-semibold text-slate-800 mb-4 text-lg">
                   <LatexRenderer content={quiz.question} />
                 </div>
                 
                 <div className="space-y-3">
                   {quiz.options.map(option => {
                     const isSelected = answers[quiz.id] === option.id;
                     let optionClass = "border-slate-200 hover:bg-slate-50 hover:border-teal-300";
                     let icon = null;

                     if (isSubmitted) {
                       if (option.isCorrect) {
                         optionClass = "border-green-500 bg-green-50 text-green-800";
                         icon = <i className="fa-solid fa-check text-green-600 ml-auto"></i>;
                       } else if (isSelected) {
                         optionClass = "border-red-500 bg-red-50 text-red-800";
                         icon = <i className="fa-solid fa-xmark text-red-600 ml-auto"></i>;
                       } else {
                         optionClass = "border-slate-100 opacity-50";
                       }
                     } else if (isSelected) {
                       optionClass = "border-teal-500 bg-teal-50 ring-1 ring-teal-500";
                     }

                     return (
                       <div 
                         key={option.id}
                         onClick={() => handleSelect(quiz.id, option.id)}
                         className={`border rounded-lg p-3 cursor-pointer transition-all flex items-center gap-3 ${optionClass}`}
                       >
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-teal-600' : 'border-slate-300'}`}>
                           {isSelected && <div className="w-2.5 h-2.5 bg-teal-600 rounded-full"></div>}
                         </div>
                         <div className="flex-1"><LatexRenderer content={option.text} /></div>
                         {icon}
                       </div>
                     );
                   })}
                 </div>

                 {isSubmitted && !isCorrect && quiz.explanation && (
                   <div className="mt-4 p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 animate-fadeIn">
                     <span className="font-bold text-slate-800">Giải thích: </span>
                     <LatexRenderer content={quiz.explanation} as="span" />
                   </div>
                 )}
               </div>
             </div>
           </div>
         );
       })}

       {!isSubmitted && (
         <div className="flex justify-end pt-4">
           <button 
             onClick={handleSubmit}
             className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-teal-700 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
           >
             <i className="fa-solid fa-paper-plane"></i> Nộp bài
           </button>
         </div>
       )}
    </div>
  );
};

export default LessonView;