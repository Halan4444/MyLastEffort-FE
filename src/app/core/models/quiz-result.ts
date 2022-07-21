import { Answer } from './answer';

export interface QuizResult {
  answers: Array<Answer>;
  numberGoodAnswers: number;
  numberWrongAnswers: number;
  result: boolean;
}
