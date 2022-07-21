import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Quiz } from '../../../../core/models/quiz';
import { Answer } from '../../../../core/models/answer';
import { ButtonType } from '../../../../core/models/enums/button-type';
import { QuizService } from '../../../../core/services/quizzes/quiz/quiz.service';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { AuthenticationService } from 'src/app/core/services/account/authentication/authentication.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit, DoCheck {
  private _quizId: string;
  private _quiz: Quiz;
  private _activeQuestion = 0;
  private _quizTime: number | undefined;
  private _quizOnTime: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private firebaseService: FirebaseService,
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this._quizId = this.route.snapshot.paramMap.get('id');
    this.quizService.answers = [];
    const firebaseCollectionName = this.quizService.collectionName;
    const loggedUser = this.authenticationService.user;
    const dashboardRoute = 'dashboard';

    if (loggedUser && this.router.url.includes(dashboardRoute)) {
      this.firebaseService.getUserQuizByid(loggedUser.uid, this._quizId).pipe(first()).subscribe(quiz => {
        this._quiz = quiz;
        this._quizOnTime = quiz.config.quizOnTime;
        this._quizTime = quiz.config.timeInSeconds;
        this.quizService.initAnswers(this._quizId, quiz);
      });
    } else {
        this.firebaseService.getQuizById(firebaseCollectionName, this._quizId).pipe(first()).subscribe(quiz => {
          this._quiz = quiz;
          this._quizOnTime = quiz.config.quizOnTime;
          this._quizTime = quiz.config.timeInSeconds;
          this.quizService.initAnswers(this._quizId, quiz);
        });
    }
  }

  ngDoCheck() {
    const quizTime = this._quizTime;
    const quizId = this._quizId;

    if (quizTime && quizTime < 1) {
      this.router.navigate(['/quizzes/quiz/result/', quizId]);
    }
  }

  get quizId(): string {
    return this._quizId;
  }

  get quiz(): Quiz {
    return this._quiz;
  }

  get activeQuestion(): number {
    return this._activeQuestion;
  }

  get quizOnTime(): boolean {
    return this._quizOnTime;
  }

  getAnswers(): Array<Answer> {
    return this.quizService.answers;
  }

  changeAnswer(answer: string): void {
    this.quizService.changeAnswer({questionNumber: this._activeQuestion, answer});
  }

  quizTimeValueChange(timeValue: number): void {
    this._quizTime = timeValue;
  }

  changeActiveQuestion(buttonType: string): void {
    if (this._activeQuestion > 0 && buttonType === ButtonType.Prev) {
      this._activeQuestion -= 1;
    } else if (this._activeQuestion < Object.keys(this._quiz.questions).length - 1 && buttonType === ButtonType.Next) {
      this._activeQuestion += 1;
    }
  }
}
