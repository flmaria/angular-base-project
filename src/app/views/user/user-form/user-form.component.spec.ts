import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { LoginService } from '../../login/login.service';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../user.service';
import { MatIconModule } from '@angular/material/icon';
import { threadId } from 'worker_threads';
import { of } from 'rxjs';
import { User } from 'src/app/core/model/User';
import { asyncData } from 'src/app/core/testing/async-observable-helpers';
import { Profile } from 'src/app/core/model/Profile';

describe('UserFormComponent', () => {
  
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  let userServiceSpy = jasmine.createSpyObj('UserService', ['getUser', 'createUser', 'updateUser']);
  let profileServiceSpy = jasmine.createSpyObj('ProfileService', ['listAll']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
  let activatedRouteSpy = { snapshot: convertToParamMap({ 'id': 12 })};
  let activatedRoute:any;
  let matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['']);


  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ 
          UserFormComponent
        ],
          imports: [FormsModule, BrowserAnimationsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule], 
          providers: [
            FormBuilder,
            {provide: UserService, useValue: userServiceSpy},
            {provide: ProfileService, useValue: profileServiceSpy},
            {provide: Router, useValue: routerSpy},
            {provide: ActivatedRoute, useValue: activatedRouteSpy},
            {provide: MatSnackBar, useValue: matSnackBarSpy}
          ]
      })
      .compileComponents()
      .then(() => {
  
          fixture = TestBed.createComponent(UserFormComponent);
          component = fixture.componentInstance;

          activatedRoute = TestBed.get(ActivatedRoute);
      });
    })

  );

  it('should init in new mode', () => {
    activatedRoute.snapshot = convertToParamMap({});
    fixture.detectChanges();
  
    expect(component.actionDescription).toEqual('Add');
  });

  it('should init in edit mode', () => {
    activatedRoute.snapshot  = convertToParamMap({ 'id': 1 });

    const user = new User();
    user.name = 'testName';
    user.login = 'testLogin';
    user.email = 'test@mail.com';
    
    userServiceSpy.getUser.calls.reset();
    userServiceSpy.getUser.and.returnValue(asyncData(user));
    fixture.detectChanges(); //automatically call ngOnInit()
    // flush();
    
    expect(userServiceSpy.getUser.calls.count()).toBe(1, 'one call');
    expect(component.actionDescription).toEqual('Update');  
    
    fixture.whenStable().then(() => { // wait for async getQuote
      expect(component.user).toEqual(user);
    });
  });

  it('should invalidate when form is empty', async(() => {
    activatedRoute.snapshot = convertToParamMap({});
    
    const user = new User();
    userServiceSpy.getUser.and.returnValue(asyncData(user));
    
    fixture.detectChanges();

    fixture.whenStable().then(() => { // wait for async getQuote
      expect(component.form.valid).toBeFalsy();
    });
  }));

  it('should insert user', () => {
    activatedRoute.snapshot = convertToParamMap({});
    
    component.user = new User();
    component.user.name = 'testName';
    component.user.login = 'testLogin';
    component.user.email = 'test@mail.com';
    component.user.newPassword = '123';

    component.user.profile = new Profile();
    component.user.profile.id = 1;
    component.user.profile.name = 'profileTest';

    userServiceSpy.createUser.and.returnValue(asyncData({}));

    fixture.detectChanges(); //Before any action, call this method
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    
    expect(userServiceSpy.createUser.calls.count()).toBe(1, 'one call');
  });

  it('should update user', () => {
    activatedRoute.snapshot  = convertToParamMap({ 'id': 1 });
    
    const user = new User();
    user.name = 'testName';
    user.login = 'testLogin';
    user.email = 'test@mail.com';
    
    userServiceSpy.getUser.calls.reset();
    userServiceSpy.getUser.and.returnValue(asyncData(user));


    component.user = new User();
    component.user.name = 'testName';
    component.user.login = 'testLogin';
    component.user.email = 'test@mail.com';
    component.user.newPassword = '123';

    component.user.profile = new Profile();
    component.user.profile.id = 1;
    component.user.profile.name = 'profileTest';

    userServiceSpy.updateUser.and.returnValue(asyncData({}));
    
    fixture.detectChanges(); //Before any action, call this method
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    
    expect(userServiceSpy.updateUser.calls.count()).toBe(1, 'one call');
  });

});
