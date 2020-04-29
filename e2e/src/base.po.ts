import { browser, element, by } from 'protractor';

export class BasePO {

    getElementById(id:string) {
        return element(by.id(id));
    }

    getElementByIdAndIndex(id:string, index:number) {
        const elements = element.all(by.id(id));;
        return elements.get(index);
    }

    clickButtonById(id:string) {
        const button = this.getElementById(id);
        button.click();
        browser.waitForAngular();
    }

    setInputValueFromId(id:string, value:string) {
        const input = this.getElementById(id);
        input.clear();
        input.sendKeys(value);
    }

    setInputValueFromIdAndIndex(id:string, index:number, value:string) {
        const input = this.getElementByIdAndIndex(id, index);
        input.clear();
        input.sendKeys(value);
    }

    setSelectValueFromId(id:string, text:string) {
        const select = this.getElementById(id);
        select.click();
        
        element(by.cssContainingText('mat-option .mat-option-text', text)).click();
        browser.waitForAngular();
    }

}