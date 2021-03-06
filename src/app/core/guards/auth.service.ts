import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../core/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getUserLogged(): User {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    this.user = this.jwtHelper.decodeToken(token);
    this.user.name = name;
    this.user.email = email;
    return this.user;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public isAuthorized(expectedRole): boolean {
    
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    
    let authorized = false;

    if (decodedToken && decodedToken.authorities) {
      decodedToken.authorities.forEach(function (value) {
        const role = value.authority;
        
        if (expectedRole === role) {
          authorized = true;
        }
      });
      
      return authorized;
    }
    else {
      return authorized;
    }
  }

}
