import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationDialogComponent } from './user-registration-dialog.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { asyncData } from 'src/app/core/testing/async-observable-helpers';

describe('UserRegistrationDialogComponent', () => {
  let component: UserRegistrationDialogComponent;
  let fixture: ComponentFixture<UserRegistrationDialogComponent>;

  let loginServiceSpy = jasmine.createSpyObj('LoginService', ['register']);
  let loginService: any;
  
  let matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'openFromComponent']);
  let matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UserRegistrationDialogComponent
      ],
        imports: [ReactiveFormsModule, BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule], 
        providers: [
          FormBuilder,
          {provide: LoginService, useValue: loginServiceSpy},
          {provide: MatSnackBar, useValue: matSnackBarSpy},
          {provide: MatDialogRef, useValue: matDialogRefSpy}
        ]
    })
    .compileComponents()
    .then(() => {

        fixture = TestBed.createComponent(UserRegistrationDialogComponent);
        component = fixture.componentInstance;
        loginService = TestBed.get(LoginService);

        component.ngOnInit(); //Angular doesnt call it automatically
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate when form is empty', () => {
    expect(component.formCreate.valid).toBeFalsy();
  });

  it('should invalidate form when name is empty', () => {
    let login = component.formCreate.controls['login'];
    login.setValue('test');

    let email = component.formCreate.controls['email'];
    email.setValue('test@email.com');

    let newPassword = component.formCreate.controls['newPassword'];
    newPassword.setValue('123');
    
    expect(component.formCreate.valid).toBeFalsy();
  });

  it('should invalidate form when login is empty', () => {
    let name = component.formCreate.controls['name'];
    name.setValue('test');

    let email = component.formCreate.controls['email'];
    email.setValue('test@email.com');

    let newPassword = component.formCreate.controls['newPassword'];
    newPassword.setValue('123');
    
    expect(component.formCreate.valid).toBeFalsy();
  });

  it('should invalidate form when email is empty', () => {
    let name = component.formCreate.controls['name'];
    name.setValue('test');

    let login = component.formCreate.controls['login'];
    login.setValue('test');

    let newPassword = component.formCreate.controls['newPassword'];
    newPassword.setValue('123');
    
    expect(component.formCreate.valid).toBeFalsy();
  });

  it('should invalidate form when password empty', () => {
    let name = component.formCreate.controls['name'];
    name.setValue('test');

    let login = component.formCreate.controls['login'];
    login.setValue('test');

    let email = component.formCreate.controls['email'];
    email.setValue('test@email.com');
    
    expect(component.formCreate.valid).toBeFalsy();
  });

  it('should create user', () => {
    let name = component.formCreate.controls['name'];
    name.setValue('test');

    let login = component.formCreate.controls['login'];
    login.setValue('test');

    let email = component.formCreate.controls['email'];
    email.setValue('test@email.com');

    let newPassword = component.formCreate.controls['newPassword'];
    newPassword.setValue('123');

    loginServiceSpy.register.and.returnValue(asyncData('true'));

    fixture.detectChanges(); //Before any action, call this method
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();

    expect(loginServiceSpy.register.calls.count()).toBe(1, 'one call');
    
    fixture.whenStable().then(() => { // wait for async getQuote
      expect(matDialogRefSpy.close.calls.count()).toBe(1, 'one call');
    });
    
  });

});
