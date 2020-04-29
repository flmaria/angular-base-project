import { browser, promise} from 'protractor';
import { BasePO } from '../base.po';

export class LoginPage extends BasePO {
    
    getLoginURL() {
        return '/login';
    }
    
    navigateToLoginPage(): promise.Promise<any> {
        return browser.get(this.getLoginURL());
    }

    authenticatesUser(login:string, password:string) {
        this.setInputValueFromId('login', login);
        this.setInputValueFromId('password', password);
        
        this.clickButtonById('btn-login');
    }

    callUserRegistrationScreen() {
        this.clickButtonById('btn-register');
    }

}