import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { AuthenticationService } from '../../../../core/services/account/authentication/authentication.service';
import { Quiz } from '../../../../core/models/quiz';

@Component({
  selector: 'app-user-quizzes-list',
  templateUrl: './user-quizzes-list.component.html',
  styleUrls: ['./user-quizzes-list.component.scss']
})
export class UserQuizzesListComponent implements OnInit {

  private _quizzesList;
  private _userUid: string;

  constructor(
    private firebaseService: FirebaseService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this._userUid = this.authenticationService.user.uid;

    this.firebaseService.getQuizzesByUserUid(this._userUid).subscribe(quizzes => {
      this._quizzesList = quizzes;
    });
  }

  get quizzesList() {
    return this._quizzesList;
  }

  get userUid(): string {
    return this._userUid;
  }

  removeQuiz(quizId: string) {
    this.firebaseService.removeUserQuizById(this._userUid, quizId);
  }
}
