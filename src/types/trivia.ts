
export type QuestionType = 'multiple' | 'boolean';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TriviaQuestionResponse {
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaApiResponse {
  response_code: number;
  results: TriviaQuestionResponse[];
}

export interface QuizQuestion {
  category: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  answers: string[];
}