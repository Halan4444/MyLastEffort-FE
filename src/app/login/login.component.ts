import {Component, Injectable, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {NgForm} from '@angular/forms';
import {showPopupError, showToastSuccess} from '../note';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({ providedIn: 'root' })
export class LoginComponent implements OnInit {
  user: User = {};

  isShowPassword: boolean = false;


  // tslint:disable-next-line:variable-name
  constructor(private _authenticationService: AuthenticationService,
              // tslint:disable-next-line:variable-name
              private _router: Router) {
    this._authenticationService.logout();
  }

  ngOnInit() {
  }

  login(formLogin: NgForm) {
    this.user = formLogin.value;
    this._authenticationService.login(this.user.username, this.user.password).subscribe((data) => {
      const title = 'Đăng nhập thành công';
      showToastSuccess(title);
      this._router.navigateByUrl('/home');
    }, error => {
      const title = 'Thông báo';
      const content = 'Tên đăng nhập hoặc mật khẩu không đúng';
      showPopupError(title, content);
    });
  }

  changeShowPass() {
    this.isShowPassword = !this.isShowPassword;
  }
}
