import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { FirebaseService } from '../../firebase/firebase.service';
import { first } from 'rxjs/operators';
import { Quiz } from '../../../models/quiz';
import { Answer } from '../../../models/answer';
import { QuizResult } from '../../../models/quiz-result';
import { AnswerFromForm } from '../../../models/answer-from-form';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _quizId: string;
  private _quiz: Quiz;
  private _answers = [];
  private _firebaseCollectionName: string;
  private _quizResult = new Subject<QuizResult>();
  private _loggedUser;

  constructor(
    private firebaseService: FirebaseService,
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.angularFireAuth.authState.subscribe(user => {
      this._loggedUser = user;
    });
    this._firebaseCollectionName = this.route.snapshot.queryParamMap.get('collectionName');
  }

  initAnswers(quizId: string, quiz: Quiz): void {
    this._quizId = quizId;
    this._quiz = quiz;

    quiz.questions.forEach(question => {
      this._answers.push({
        answer: '',
        correctAnswer: question.correctAnswer
      });
    });
  }

  get quiz(): Quiz {
    return this._quiz;
  }

  get answers(): Array<Answer> {
    return this._answers;
  }

  set answers(answers: Array<Answer>) {
    this._answers = answers;
  }

  get collectionName(): string {
    return this._firebaseCollectionName;
  }

  setFirebaseCollectionName(name: string): void {
    this._firebaseCollectionName = name;
  }

  getQuizResult(): Observable<QuizResult> {
    return this._quizResult.asObservable();
  }

  changeAnswer(answer: AnswerFromForm): void {
    this._answers.forEach((currentAnswer, index) => {
      if (index === answer.questionNumber) {
        currentAnswer.answer = answer.answer;
      }
    });
  }

  checkQuizResult(): void {
    const quizId = this._quizId;
    const collectionName = this._firebaseCollectionName;
    const answersToPass = this._quiz.config.numberAnswersNeededToPass;
    const quizResult = {
      answers: this._answers,
      numberGoodAnswers: 0,
      numberWrongAnswers: 0,
      result: false
    };
    this._quizResult.next(quizResult);
    this._answers.forEach(answer => {
      answer.answer === answer.correctAnswer ? quizResult.numberGoodAnswers += 1 : quizResult.numberWrongAnswers += 1;
    });
    quizResult.result = quizResult.numberGoodAnswers >= answersToPass ? true : false;

    if (this._loggedUser && this.firebaseService.isUserQuiz) {
      this.firebaseService.getUserQuizResults(this._loggedUser.uid, quizId).pipe(first()).subscribe(quiz => {
        const results = [...quiz.results, quizResult];
        this.firebaseService.setUserQuizResult(this._loggedUser.uid, quizId, results);
      });
    } else {
      this.firebaseService.getQuizResults(collectionName, quizId).pipe(first()).subscribe(data => {
        const results = data && data.results ? [...data.results, quizResult] : [quizResult];
        this.firebaseService.setQuizResult(collectionName, quizId, results);
      });
    }
  }
}
