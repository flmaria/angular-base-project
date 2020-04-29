import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { User } from 'src/app/core/model/User';
import { Profile } from 'src/app/core/model/Profile';
import { asyncData } from 'src/app/core/testing/async-observable-helpers';
import { UserDataSource } from '../user-data-source';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let element: DebugElement;

  let userServiceSpy = jasmine.createSpyObj('UserService', ['getUsersPage', 'deleteUser']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  let dataSource:UserDataSource;
  let dataSourceSpy = jasmine.createSpyObj('UserDataSource', ['loadUsers', 'counter', 'connect', 'disconnect']);
  let matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['']);

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ 
          UserListComponent
        ],
          imports: [BrowserAnimationsModule, MatCardModule, MatIconModule, MatTableModule, MatSortModule, MatPaginatorModule], 
          providers: [
            {provide: UserService, useValue: userServiceSpy},
            {provide: Router, useValue: routerSpy},
            {provide: UserDataSource, useValue: dataSourceSpy},
            {provide: MatSnackBar, useValue: matSnackBarSpy}
          ]
      })
      .compileComponents()
      .then(() => {
  
          fixture = TestBed.createComponent(UserListComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement

          dataSource = TestBed.get(UserDataSource);
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the table ', async(() => {
    let userList = [];

    const user = new User();
    user.name = 'testName';
    user.login = 'testLogin';
    user.email = 'test@mail.com';
    user.profile = new Profile();
    user.profile.id = 1;
    user.profile.name = 'profileTest';
    userList.push(user);

    let page = {data: userList, total:1};

    userServiceSpy.getUsersPage.and.returnValue(asyncData(page));
    fixture.detectChanges();

    fixture.whenStable().then(() => { 
      fixture.detectChanges();  
      
      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toContain('Name');
      expect(headerRow.cells[1].innerHTML).toContain('Login');
      expect(headerRow.cells[2].innerHTML).toContain('E-mail');
      expect(headerRow.cells[3].innerHTML).toContain('Operations');

      let row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toContain('testName');
      expect(row1.cells[1].innerHTML).toContain('testLogin');
      expect(row1.cells[2].innerHTML).toContain('test@mail.com');
      
    });
  }));



});
