import { browser, promise, element, by } from 'protractor';
import { BasePO } from '../base.po';

export class UserPage extends BasePO {
    
    getUserURL() {
        return '/app/users';
    }
    
    navigateToUsersPage(): promise.Promise<any> {
        return browser.get(this.getUserURL());
    }

    callUserAddScreen() {
        this.clickButtonById('btn-add');
    }

    fromUserAddScreenAddUser(user:any) {
        this.setInputValueFromId('name', user.name);
        this.setInputValueFromId('login', user.login);
        this.setInputValueFromId('email', user.email);
        this.setInputValueFromId('newPassword', user.newPassword);
        this.setSelectValueFromId('profile', user.profileName);

        this.clickButtonById('btn-save');
    }

    fromUserEditScreenUpdateUser(user:any) {
        this.setInputValueFromId('name', user.name);
        this.setInputValueFromId('login', user.login);
        this.setInputValueFromId('email', user.email);
        this.setInputValueFromId('newPassword', user.newPassword);
        
        this.clickButtonById('btn-save');
    }

    fromUserRegistrationAddUser(user:any) {
        this.setInputValueFromId('name', user.name);
        // this.setInputValueFromId('login', user.login);
        this.setInputValueFromIdAndIndex('login', 1, user.login);
        this.setInputValueFromId('email', user.email);
        this.setInputValueFromId('newPassword', user.newPassword);
        
        this.clickButtonById('btn-create');
    }

    async getRowIndexOnTableByLogin(login:string) {
        const totalColumns = 4;

        const tds = element.all(by.tagName('tr')).all(by.tagName('td'));
        const tdCount = await tds.count();

        const rowTotal = tdCount/totalColumns;

        let count = 1;

        while (count <= rowTotal) {
            const td = element.all(by.tagName('tr')).get(count).all(by.tagName('td'));
            
            const loginText = await td.get(1).getText(); //login

            if (loginText === login) {
                return count;
            }

            count++;
        }

        return -1;
    }

    async callUserEditScreenFromIndex(index: number) {
        const td = element.all(by.tagName('tr')).get(index).all(by.tagName('td'));
        const userEditButton = await td.get(3).element(by.buttonText('edit'));
        
        await userEditButton.click();
        await browser.waitForAngular();
    }

    async callUserDeleteFromIndex(index: number) {
        const td = element.all(by.tagName('tr')).get(index).all(by.tagName('td'));
        const userDeleteButton = await td.get(3).element(by.buttonText('delete'));
        
        await userDeleteButton.click();
        await browser.waitForAngular();
    }

    
}