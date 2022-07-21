import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { QuizService } from '../../../../core/services/quizzes/quiz/quiz.service';
import { Quiz } from '../../../../core/models/quiz';
import { exampleQuizzes, usersQuizzes } from '../../../../core/constants';

@Component({
  selector: 'app-quizzes-list-category',
  templateUrl: './quizzes-list-category.component.html',
  styleUrls: ['./quizzes-list-category.component.scss']
})
export class QuizzesListCategoryComponent implements OnInit {
  private _quizzesList;
  private _componentTitle: string;
  private _collectionName: string;

  constructor(
    private firebaseService: FirebaseService,
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this._collectionName = this.route.snapshot.queryParamMap.get('collectionName');
      this._componentTitle = this._collectionName === 'exampleQuizzes' ? exampleQuizzes : usersQuizzes;
      this.quizService.setFirebaseCollectionName(this._collectionName);

      this.firebaseService.getQuizzesByCollectionName(this._collectionName).subscribe(quizzes => {
        this._quizzesList = quizzes;
      });
    });
  }

  get quizzesList(): Array<Quiz> {
    return this._quizzesList;
  }

  get componentTitle(): string {
    return this._componentTitle;
  }

  get collectionName(): string {
    return this._collectionName;
  }
}
