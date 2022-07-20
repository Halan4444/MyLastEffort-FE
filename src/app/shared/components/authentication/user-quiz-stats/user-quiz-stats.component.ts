import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { AuthenticationService } from 'src/app/core/services/account/authentication/authentication.service';
import { Quiz } from '../../../../core/models/quiz';
import { QuizStats } from '../../../../core/models/quizStats';

@Component({
  selector: 'app-user-quiz-stats',
  templateUrl: './user-quiz-stats.component.html',
  styleUrls: ['./user-quiz-stats.component.scss']
})
export class UserQuizStatsComponent implements OnInit {

  private _quizId: string;
  private _quiz: Quiz;
  private _quizType: string;
  private _quizStats = {
    quizPassed: 0,
    quizNotPassed: 0
  };

  constructor(
    private firebaseService: FirebaseService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._quizId = this.route.snapshot.paramMap.get('id');
    const loggedUser = this.authenticationService.user;
    const quizType = 'quiz';
    const surveyType = 'ankiety';

    if (loggedUser) {
      this.firebaseService.getUserQuizByid(loggedUser.uid, this._quizId).pipe(first()).subscribe(quiz => {
        this._quiz = quiz;
        this._quizType = quiz.config.quizWithResult ? quizType : surveyType;
        this.prepareDisplayResult();
      });
    }
  }

  get quiz(): Quiz {
    return this._quiz;
  }

  get quizStats(): QuizStats {
    return this._quizStats;
  }

  get quizType(): string {
    return this._quizType;
  }

  prepareDisplayResult(): void {
    this._quiz.results.map(result => {
      result.result === true ? this._quizStats.quizPassed += 1 : this._quizStats.quizNotPassed += 1;
    });
  }
}
