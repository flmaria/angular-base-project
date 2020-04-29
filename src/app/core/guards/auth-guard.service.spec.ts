import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

describe('AuthGuardService', () => {
  
  let authGuardService: AuthGuardService;
  let authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'isAuthorized']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    authGuardService = new AuthGuardService(authSpy, routerSpy);
  });

  it('should access if it has specific role and is authenticaed', () => {
    let routeSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['data']);
    
    authSpy.isAuthenticated.and.returnValue(true);
    authSpy.isAuthorized.and.returnValue(true);
    
    let result = authGuardService.canActivate(routeSpy);
    expect(result).toEqual(true);
  });

  it('should redirect to login if is not authenticated', () => {
    let routeSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['data']);
    
    authSpy.isAuthenticated.and.returnValue(false);
    authSpy.isAuthorized.and.returnValue(true);
    
    let result = authGuardService.canActivate(routeSpy);
    expect(result).toEqual(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should not be forbidden if it is authenticaed but doesnt has specific role', () => {
    let routeSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['data']);
    
    authSpy.isAuthenticated.and.returnValue(true);
    authSpy.isAuthorized.and.returnValue(false);
    
    let result = authGuardService.canActivate(routeSpy);
    expect(result).toEqual(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/app/forbidden']);
  });

});
