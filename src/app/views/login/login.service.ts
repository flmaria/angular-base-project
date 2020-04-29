import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from './../../core/model/User';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi: string;
  
  user: User;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.urlApi = environment.urlApi;
  }

  login(login, password) {
    return this.http.post(`${this.urlApi}/login`, { login, password })
      .pipe(
        tap((response: any) => {
          this.user = this.jwtHelper.decodeToken(response.token);

          localStorage.setItem('name', this.user.name);
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('token', response.token);
        }),
        catchError((err: any) => {
          localStorage.clear();
          throw err;
        })
      );
  }

  register(user: User) {
    return this.http.post<User>(`${this.urlApi}/login/register`, user);
  }

   
}
