import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../service/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // tslint:disable-next-line:variable-name
  constructor(private _authenticationService: AuthenticationService,
              // tslint:disable-next-line:variable-name
              private _router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this._authenticationService.currentUserValue;
    if (currentUser == null) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
