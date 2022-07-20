import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // tslint:disable-next-line:variable-name
  private _user: User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router) {
    this.angularFireAuth.authState.subscribe(user => {
      this._user = user;
    });
  }

  get user(): User {
    return this._user;
  }

  // login(username: string, password: string): void {
  //   this.angularFireAuth.signInWithEmailAndPassword(username , password).then(user => {
  //     this.router.navigate(['/dashboard/list']);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  // login(username: string, password: string): void {
  //   this.angularFireAuth.signInWithEmailAndPassword(username , password).then(user => {
  //     this.router.navigate(['/dashboard/list']);
  //   })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  //
  // register(email: string, password: string): void {
  //   this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(user => {
  //     this.angularFirestore.collection('users').doc(user.user.uid).set({userId: user.user.uid});
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }
  //
  // logout(): void {
  //   this.angularFireAuth.signOut();
  // }
}
