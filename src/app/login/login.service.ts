import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { UserLogin } from 'src/common/interfaces/user-login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/auth/login`;
  }

  login(payload: UserLogin) {
    const url = this.apiUrl;
    return this.http.post(url, payload);
  }
}
