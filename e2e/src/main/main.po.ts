import { element, by } from 'protractor';
import { BasePO } from '../base.po';

export class MainPage extends BasePO {
    
    async navigateToUsersPage() {
        await this.clickLinkMenuById('tb-menu', 'Users');
    }

    async navigateToRestaurantOwnersPage() {
        await this.clickLinkMenuById('tb-menu', 'Restaurant Owners');
    }
    
    getToolbarDynamicMenu() {
        return element(by.id('tb-menu'));
    }
    
    async logoutUser() {
        await this.clickButtonById('tb-logout');
    }

}