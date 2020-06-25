import { TestBed, getTestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from 'src/app/core/model/User';
import { asyncData } from 'src/app/core/testing/async-observable-helpers';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let userService: UserService;
  
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    injector = getTestBed();
    userService = injector.get(UserService);
    httpMock = injector.get(HttpTestingController)

  });

 it('should get User from Id', () => {
  const expectedUser = new User();
  expectedUser.id = 0;
  expectedUser.name = 'test User';

  userService.getUser(0).subscribe(user => {
    expect(user).toEqual(expectedUser);
  });
  
  const req = httpMock.expectOne(`${userService.urlApi}/${expectedUser.id}`);
  expect(req.request.method).toBe("GET");
  req.flush(expectedUser);
});

it('should create user', () => {
  let expectedUser = new User();
  expectedUser.name = 'test User';
  
  userService.createUser(expectedUser).subscribe(user => {
    expect(user).toEqual(expectedUser);
  });
  
  const req = httpMock.expectOne(`${userService.urlApi}`);
  expect(req.request.method).toBe("POST");
  req.flush(expectedUser);
});

it('should update user', () => {
  let expectedUser = new User();
  expectedUser.name = 'test User';
  
  userService.updateUser(expectedUser).subscribe(
    user => expect(user).toEqual(expectedUser, 'updated user'),
    fail
  );
  
  const req = httpMock.expectOne(`${userService.urlApi}`);
  expect(req.request.method).toBe("PUT");
  req.flush(expectedUser);
});

it('should delete user', () => {
  const user = new User();
  user.id = 0;
  user.name = 'test User';
  
  userService.deleteUser(user.id).subscribe(
    value => expect(value).toEqual("true", 'deleted user'),
    fail
  );
  
  const req = httpMock.expectOne(`${userService.urlApi}/${user.id}`);
  expect(req.request.method).toBe("DELETE");

  req.flush("true");
});

it('should get user page', () => {
  let expectedPageResult = {data:[], total:1}
  
  let user = new User();
  user.name = 'test User';
  expectedPageResult.data.push(user);

  userService.getUsersPage(0, 50, "abc", "desc").subscribe(
    page => expect(page).toEqual(expectedPageResult, 'expected user page'),
    fail
  );

  const req = httpMock.expectOne(`${userService.urlApi}?pageIndex=0&pageSize=50&sortBy=abc&sortAscending=false`);
  expect(req.request.method).toBe("GET");

  req.flush(expectedPageResult);
});


});
