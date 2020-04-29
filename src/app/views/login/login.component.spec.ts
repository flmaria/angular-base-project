import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';

import { asyncData } from 'src/app/core/testing/async-observable-helpers';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
  let loginService: any;

  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  
  let matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['']);
  let matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent
      ],
        imports: [ReactiveFormsModule, BrowserAnimationsModule, MatCardModule, MatFormFieldModule, MatInputModule], 
        providers: [
          FormBuilder,
          {provide: LoginService, useValue: loginServiceSpy},
          {provide: Router, useValue: routerSpy},
          {provide: MatSnackBar, useValue: matSnackBarSpy},
          {provide: MatDialog, useValue: matDialogSpy}
        ]
    })
    .compileComponents()
    .then(() => {

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        loginService = TestBed.get(LoginService);

        component.ngOnInit(); //Angular doesnt call it automatically
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate when form is empty', () => {
    expect(component.formLogin.valid).toBeFalsy();
  });

  it('should invalidate form when login is empty', () => {
    let password = component.formLogin.controls['password'];
    password.setValue('123');
    
    expect(component.formLogin.valid).toBeFalsy();
  });

  it('should invalidate form when password is empty', () => {
    let login = component.formLogin.controls['login'];
    login.setValue('test');
    
    expect(component.formLogin.valid).toBeFalsy();
  });

  it('should invalidate login input', () => {
    let login = component.formLogin.controls['login'];
    expect(login.valid).toBeFalsy();
  });

  it('should invalidate password input', () => {
    let password = component.formLogin.controls['password'];
    expect(password.valid).toBeFalsy();

  });

  it('should login', () => {
    let login = component.formLogin.controls['login'];
    login.setValue('test');

    let password = component.formLogin.controls['password'];
    password.setValue('123');

    let loginReponse = {token:'token123'};
    loginServiceSpy.login.and.returnValue(asyncData(loginReponse));

    fixture.detectChanges(); //Before any action, call this method
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();

    expect(loginServiceSpy.login.calls.count()).toBe(1, 'one call');
    
    fixture.whenStable().then(() => { // wait for async getQuote
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/app');
    });
  });

});
