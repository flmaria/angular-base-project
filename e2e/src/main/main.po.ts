import { element, by } from 'protractor';
import { BasePO } from '../base.po';

export class MainPage extends BasePO {
    
    getToolbarDynamicMenu() {
        return element(by.id('tb-menu'));
    }
    
    logoutUser() {
        this.clickButtonById('tb-logout');
    }

}