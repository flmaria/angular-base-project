import { UserPage } from './user.po';
import { LoginPage } from './../login/login.po';
import { MainPage } from './../main/main.po';

import { browser, logging } from 'protractor';
import { BrowserUtil } from '../utils/browserUtil';

describe('User Page', () => {
    let browserUtil: BrowserUtil;
    
    let loginPage: LoginPage;
    let mainPage: MainPage;
    let userPage: UserPage;

  beforeEach(() => {
    browserUtil = new BrowserUtil();
    loginPage = new LoginPage();
    mainPage = new MainPage();
    userPage = new UserPage();
    
    loginPage.authenticatesUser('admin', 'admin');
  });

  it('should create, update and delete user', async() => {
    await mainPage.navigateToUsersPage();
    browser.waitForAngular();
    browserUtil.sleep();

    //############### Create user ###############
    await userPage.callUserAddScreen();
    browser.waitForAngular();
    browserUtil.sleep();

    const user = {name:'e2eUserName', login:'e2eUserLogin', email:'e2eUserEmail@test.com', newPassword:'e2epassword', profileName:'Regular'};
    await userPage.fromUserAddScreenAddUser(user);
    browser.waitForAngular();
    browserUtil.sleep();

    const addRowIndex = await userPage.getRowIndexOnTableByLogin(user.login);
    browser.waitForAngular();
    
    expect(addRowIndex).toBeGreaterThan(-1, 'Created user not found');

    if (addRowIndex == -1) {
        return;
    }

    //############### Update user ###############
    await userPage.callUserEditScreenFromIndex(addRowIndex);
    browser.waitForAngular();
    browserUtil.sleep();
    
    const userUpdate = {name:'e2eUserNameUpdate', login:'e2eUserLoginUpdate', email:'e2eUserEmailUpdate@test.com', 
                            newPassword:'e2epasswordUpdate'
    };

    await userPage.fromUserEditScreenUpdateUser(userUpdate);
    browser.waitForAngular();
    browserUtil.sleep();
    
    const editRowIndex = await userPage.getRowIndexOnTableByLogin(userUpdate.login);
    browser.waitForAngular();

    expect(editRowIndex).toBeGreaterThan(-1, 'Update user not found');

    if (editRowIndex == -1) {
        return;
    }

    //############### Delete user ###############
    await userPage.callUserDeleteFromIndex(editRowIndex);
    browser.waitForAngular();
    browserUtil.sleep();

    const deleteRowIndex = await userPage.getRowIndexOnTableByLogin(userUpdate.login);
    browser.waitForAngular();

    expect(deleteRowIndex).toBe(-1, 'Unable to delete user');
  });

  afterEach(() => {
    mainPage.logoutUser();
    browser.waitForAngular();
    browserUtil.sleep();
  });
  


});
