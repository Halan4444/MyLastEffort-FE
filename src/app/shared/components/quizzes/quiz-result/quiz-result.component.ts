import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../../core/services/quizzes/quiz/quiz.service';
import { QuizResult } from '../../../../core/models/quiz-result';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  private _quizResult: QuizResult;
  private _numberAnswersNeededToPass: number | undefined;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    const answersToPass = this.quizService.quiz.config.numberAnswersNeededToPass;

    this.quizService.getQuizResult().subscribe(result => {
      this._quizResult = result;
    });

    this.quizService.checkQuizResult();
    this._numberAnswersNeededToPass = answersToPass;
  }

  get quizResult(): QuizResult {
    return this._quizResult;
  }

  get numberAnswersNeededToPass(): number | undefined {
    return this._numberAnswersNeededToPass;
  }
}
