import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('AuthService', () => {
  
  let authService: AuthService;
  let jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired', 'decodeToken']);

  beforeEach(() => {
    authService = new AuthService(jwtHelperSpy);
  });

  it('should isAuthenticated return true', () => {
    jwtHelperSpy.isTokenExpired.and.returnValue(false);
    expect(authService.isAuthenticated()).toEqual(true);
  });

});
