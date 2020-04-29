import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';
import { MainPage } from '../main/main.po';
import { BrowserUtil } from '../utils/browserUtil';
import { UserPage } from '../user/user.po';

describe('Login Page', () => {
  let browserUtil: BrowserUtil;
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userPage: UserPage;

  beforeEach(() => {
    browserUtil = new BrowserUtil();
    
    loginPage = new LoginPage();
    mainPage = new MainPage();
    userPage = new UserPage();

    loginPage.navigateToLoginPage();
});

it('it should register a new user and authenticate with it and later admin user should delete it', async() => {
    //############### Register a user ###############
    
    loginPage.callUserRegistrationScreen();
    browserUtil.sleep();

    const userRegistration = {name:'e2eRegistrationUserName', login:'e2eRegistrationUserLogin', email:'e2eRegistrationUserEmail@test.com', 
                        newPassword:'e2eRegistrationUserPassword'
    };
    userPage.fromUserRegistrationAddUser(userRegistration);
    browserUtil.sleep();

    //############### Log with the user registred ###############

    loginPage.authenticatesUser(userRegistration.login, userRegistration.newPassword);
    browserUtil.sleep();
    expect(browser.driver.getCurrentUrl()).toContain('/app');

    mainPage.logoutUser();
    browserUtil.sleep();
    expect(browser.driver.getCurrentUrl()).toContain(loginPage.getLoginURL());

    //############### Delete user registred ###############

    loginPage.authenticatesUser('admin', 'admin');
    browserUtil.sleep();
    expect(browser.driver.getCurrentUrl()).toContain('/app');

    userPage.navigateToUsersPage();
    browser.waitForAngular();
    browserUtil.sleep();

    const userRowIndex = await userPage.getRowIndexOnTableByLogin(userRegistration.login);
    await userPage.callUserDeleteFromIndex(userRowIndex);
    browserUtil.sleep();

    const deleteRowIndex = await userPage.getRowIndexOnTableByLogin(userRegistration.login);
    browser.waitForAngular();

    expect(deleteRowIndex).toBe(-1, 'Unable to delete user');

    mainPage.logoutUser();
    browserUtil.sleep();
    expect(browser.driver.getCurrentUrl()).toContain(loginPage.getLoginURL());
});

  


});
