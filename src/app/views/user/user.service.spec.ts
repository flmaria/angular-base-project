import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from 'src/app/core/model/User';
import { asyncData } from 'src/app/core/testing/async-observable-helpers';

describe('UserService', () => {
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(httpClientSpy);
  });

  it('should get User from Id', () => {
    let expectedUser = new User();
    expectedUser.name = 'test User';
    expectedUser.email = 'test@mail.com.br';
    
    httpClientSpy.get.and.returnValue(asyncData(expectedUser));

    userService.getUser(1).subscribe(
      user => expect(user).toEqual(expectedUser, 'expected user'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  
  it('should create user', () => {
    let expectedUser = new User();
    expectedUser.name = 'test User';
    expectedUser.email = 'test@mail.com.br';
    
    httpClientSpy.post.and.returnValue(asyncData(expectedUser));

    userService.createUser(expectedUser).subscribe(
      user => expect(user).toEqual(expectedUser, 'created user'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should update user', () => {
    let expectedUser = new User();
    expectedUser.name = 'test User';
    expectedUser.email = 'test@mail.com.br';
    
    httpClientSpy.put.and.returnValue(asyncData(expectedUser));

    userService.updateUser(expectedUser).subscribe(
      user => expect(user).toEqual(expectedUser, 'updated user'),
      fail
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should delete user', () => {
    httpClientSpy.delete.and.returnValue(asyncData("true"));

    userService.deleteUser(1).subscribe(
      value => expect(value).toEqual("true", 'deleted user'),
      fail
    );
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });


});
