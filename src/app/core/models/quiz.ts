import { QuizResult } from './quiz-result';

export interface Question {
  answers: Array<string>;
  correctAnswer: string;
  question: string;
}

export interface Quiz {
  title: string;
  payload: any;
  config: {
    quizWithResult: boolean,
    quizOnTime: boolean,
    numberAnswersNeededToPass: number;
    timeInSeconds: number;
  };
  questions: Array<Question>;
  results: Array<QuizResult>;
}
