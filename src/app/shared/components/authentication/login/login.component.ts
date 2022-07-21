import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../../../core/services/account/authentication/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      if (this.authenticationService.user) {
        this.router.navigate(['/dashboard/list']);
      }
    });
  }
  //
  // login(formData: NgForm): void {
  //   this.authenticationService.login(formData.value.email, formData.value.password);
  // }
}
