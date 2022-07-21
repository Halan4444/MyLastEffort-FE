import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AuthenticationService } from '../account/authentication/authentication.service';
import { Quiz } from '../../models/quiz';
import { QuizResult } from '../../models/quiz-result';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // tslint:disable-next-line:variable-name
  private _isUserQuiz: boolean;

  constructor(
    private angularFirestore: AngularFirestore,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get isUserQuiz(): boolean {
    return this._isUserQuiz;
  }

  getQuizzesByCollectionName(collectionName: string) {
    return this.angularFirestore.collection<AngularFirestoreDocument<Quiz>>(collectionName).snapshotChanges();
  }

  getQuizzesByUserUid(userUid: string) {
    return this.angularFirestore.collection('users').doc(userUid).collection('quizzes').snapshotChanges();
  }

  getQuizById(collectionName?: string, id?: string) {
    this._isUserQuiz = false;
    const uid = this.route.snapshot.queryParams.uid;
    const doc = this.route.snapshot.queryParams.doc;

    if (collectionName) {
      return this.angularFirestore.doc<Quiz>(`${collectionName}/${id}`).valueChanges();
    } else {
      return this.angularFirestore.collection('users').doc(uid).collection('quizzes').doc<Quiz>(doc).valueChanges();
    }
  }

  getUserQuizByid(userUid: string, quizId: string): any {
    this._isUserQuiz = true;
    return this.angularFirestore.collection('users').doc(userUid).collection('quizzes').doc(quizId).valueChanges();
  }

  removeUserQuizById(userUid: string, quizId: string) {
    return this.angularFirestore.collection('users').doc(userUid).collection('quizzes').doc(quizId).delete();
  }

  getQuizResults(collectionName: string, id: string) {
    return this.angularFirestore.doc<Quiz>(`${collectionName}/${id}`).valueChanges();
  }

  getUserQuizResults(userUid: string, quizId: string): any {
    return this.angularFirestore.collection('users').doc(userUid).collection('quizzes').doc(quizId).valueChanges();
  }

  setUserQuizResult(userUid: string, quizId: string, quizResults: Array<QuizResult>) {
    return this.angularFirestore.collection('users').doc(userUid).collection('quizzes').doc(quizId).update({results: quizResults});
  }

  setQuizResult(collectionName: string, quizId: string, quizResults: Array<QuizResult>) {
    return this.angularFirestore.collection<Quiz>(collectionName).doc(quizId).update({results: quizResults});
  }

  createNewQuiz(quiz: Quiz, correctAnswersArray: Array<number>) {
    const loggedUser = this.authenticationService.user;
    const dashboardRoute = 'dashboard';

    quiz.questions.forEach((element, index) => {
      const correctAnswerNumber = correctAnswersArray[index];
      element.correctAnswer = element.answers[correctAnswerNumber];
    });
    quiz.results = [];

    if (loggedUser && this.router.url.includes(dashboardRoute)) {
      return this.angularFirestore.collection('users').doc(loggedUser.uid).collection('quizzes').add(quiz);
    }
    return this.angularFirestore.collection('usersQuizzes').add(quiz);
  }

  updateUserQuiz(quizId: string, quiz: Quiz, correctAnswersArray: Array<number>) {
    const loggedUser = this.authenticationService.user;

    quiz.questions.forEach((element, index) => {
      const correctAnswerNumber = correctAnswersArray[index];
      element.correctAnswer = element.answers[correctAnswerNumber];
    });
    quiz.results = [];

    return this.angularFirestore.collection('users').doc(loggedUser.uid).collection('quizzes').doc(quizId).update(quiz);
  }
}
