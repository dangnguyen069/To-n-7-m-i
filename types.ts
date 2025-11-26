export type ExerciseLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export type SectionType = 'default' | 'definition' | 'theorem' | 'example' | 'note';

export interface Exercise {
  id: string;
  question: string;
  hint?: string;
  solution: string;
  level?: ExerciseLevel;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
  explanation?: string; // Giải thích ngắn gọn sau khi chọn
}

export interface Section {
  title: string;
  content: string[]; // Paragraphs or bullet points
  imageUrl?: string;
  type?: SectionType; // Phân loại để hiển thị màu sắc/icon phù hợp
}

export interface Lesson {
  id: string;
  title: string;
  theory: Section[];
  exercises: Exercise[];
  quizzes?: Quiz[]; // Thêm danh sách câu hỏi trắc nghiệm
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface UserProgress {
  [lessonId: string]: {
    score: number;      // Điểm số trắc nghiệm (0-100)
    completed: boolean; // Đã hoàn thành (đạt > 80%) hay chưa
    isUnlocked: boolean; // Trạng thái mở khóa
  };
}