import { LoginService } from './login.service';
import { User } from 'src/app/core/model/User';
import { asyncData } from 'src/app/core/testing/async-observable-helpers';

describe('LoginService', () => {
  
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  let jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['decodeToken']);
  let loginService: LoginService;
  
  beforeEach(() => {
    loginService = new LoginService(httpClientSpy, jwtHelperSpy);
  });

  it('should login', () => {
    let expectedUser = new User();
    expectedUser.name = 'testName';
    expectedUser.email = 'test@mail.com';

    jwtHelperSpy.decodeToken.and.returnValue(expectedUser);

    httpClientSpy.post.and.returnValue(asyncData("test"));

    loginService.login('teste', 'teste').subscribe();
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});
