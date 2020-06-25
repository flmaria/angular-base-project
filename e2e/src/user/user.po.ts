import { browser, promise, element, by } from 'protractor';
import { BasePO } from '../base.po';

export class UserPage extends BasePO {
    
    getUserURL() {
        return '/app/users';
    }
    
    async callUserAddScreen() {
        await this.clickButtonById('btn-add');
    }

    async fromUserAddScreenAddUser(user:any) {
        await this.setInputValueFromId('name', user.name);
        await this.setInputValueFromId('login', user.login);
        await this.setInputValueFromId('email', user.email);
        await this.setInputValueFromId('newPassword', user.newPassword);
        await this.setSelectValueFromId('profile', user.profileName);

        await this.clickButtonById('btn-save');
    }

    async fromUserEditScreenUpdateUser(user:any) {
        await this.setInputValueFromId('name', user.name);
        await this.setInputValueFromId('login', user.login);
        await this.setInputValueFromId('email', user.email);
        await this.setInputValueFromId('newPassword', user.newPassword);
        
        await this.clickButtonById('btn-save');
    }

    async fromUserRegistrationAddUser(user:any) {
        await this.setInputValueFromId('name', user.name);
        await this.setInputValueFromIdAndIndex('login', 1, user.login);
        await this.setInputValueFromId('email', user.email);
        await this.setInputValueFromId('newPassword', user.newPassword);
        
        await this.clickButtonById('btn-create');
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
        await this.confirmDialog();
    }

    
}