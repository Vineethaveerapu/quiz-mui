export type Difficulty = "easy" | "medium" | "hard" | "very hard";

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: string[];
  difficulty: Difficulty;
}

export interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  score: number;
  highScore: number;
}
export type HighScores = Record<Difficulty, number>;
