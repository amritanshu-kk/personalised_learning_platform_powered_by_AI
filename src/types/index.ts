export interface User {
  id: string;
  email: string;
  displayName: string | null;
}

export interface Quiz {
  questions: Question[];
  courseId: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pdfUrl: string;
}

export interface CourseContent {
  title: string;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  content: string[];
}