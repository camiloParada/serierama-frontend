import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { LoginService } from './login.service';
import { User } from 'src/common/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  public formLogin: FormGroup;
  public currentUser: User;

  constructor(private fb: FormBuilder, private _loginService: LoginService, private router: Router) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;

    if (this.currentUser) {
      this.router.navigate(['']);
    }

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getErrorMessage() {
    if (this.formLogin.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formLogin.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    this._loginService.login(this.formLogin.value).pipe(
      map((user: any) => {
        if (user && user.access_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Error: ${error}`));
      })
    ).subscribe((user) => {
      if (user) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['']);
      }
    });
  }
}
