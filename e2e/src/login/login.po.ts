import { browser, promise} from 'protractor';
import { BasePO } from '../base.po';

export class LoginPage extends BasePO {
    
    getLoginURL() {
        return '/login';
    }
    
    navigateToLoginPage(): promise.Promise<any> {
        return browser.get(this.getLoginURL());
    }

    async authenticatesUser(login:string, password:string) {
        await this.setInputValueFromId('login', login);
        await this.setInputValueFromId('password', password);
        
        await this.clickButtonById('btn-login');
    }

    async callUserRegistrationScreen() {
        await this.clickButtonById('btn-register');
    }

}