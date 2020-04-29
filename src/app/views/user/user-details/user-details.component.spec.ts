import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';


import { UserDetailsComponent } from './user-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { User } from 'src/app/core/model/User';
import { asyncData } from 'src/app/core/testing/async-observable-helpers';
import { Profile } from 'src/app/core/model/Profile';
import { DebugElement } from '@angular/core';
import {By} from '@angular/platform-browser';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let element: DebugElement;

  let userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
  let activatedRouteSpy = { snapshot: convertToParamMap({ 'id': 12 })};
  let activatedRoute:any;
  
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ 
          UserDetailsComponent
        ],
          imports: [BrowserAnimationsModule, MatCardModule, MatIconModule], 
          providers: [
            {provide: UserService, useValue: userServiceSpy},
            {provide: Router, useValue: routerSpy},
            {provide: ActivatedRoute, useValue: activatedRouteSpy}
          ]
      })
      .compileComponents()
      .then(() => {
  
          fixture = TestBed.createComponent(UserDetailsComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement

          activatedRoute = TestBed.get(ActivatedRoute);
      });
    })
  );

  it('should create the component', () => {
    const user = new User();
    user.name = 'testName';
    user.login = 'testLogin';
    user.email = 'test@mail.com';
    
    userServiceSpy.getUser.and.returnValue(asyncData(user));
    
    expect(component).toBeTruthy();

  });

  it('should should show values in template', async(() => {
    const user = new User();
    user.name = 'testName';
    user.login = 'testLogin';
    user.email = 'test@mail.com';
    user.profile = new Profile();
    user.profile.id = 1;
    user.profile.name = 'profileTest';
    
    userServiceSpy.getUser.and.returnValue(asyncData(user));

    component.ngOnInit();
    
    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();
      const labelItens = element.queryAll(By.css('.label-item'));

      expect(labelItens.length).toBe(4, "Unexpected number label itens");
      
      expect(labelItens[0].nativeElement.textContent).toContain(user.name);
      expect(labelItens[1].nativeElement.textContent).toContain(user.login);
      expect(labelItens[2].nativeElement.textContent).toContain(user.email);
      expect(labelItens[3].nativeElement.textContent).toContain(user.profile.name);
      
    });
  }));


});
