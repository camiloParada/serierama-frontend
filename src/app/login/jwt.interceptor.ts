import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/common/interfaces/user.interface';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public currentUser: User;

  constructor() {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this.currentUser && this.currentUser.access_token;

    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUser.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}
