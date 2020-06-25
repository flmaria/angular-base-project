import { browser, element, by } from 'protractor';

export class BasePO {

    getElementById(id:string) {
        return element(by.id(id));
    }

    getElementByIdAndIndex(id:string, index:number) {
        const elements = element.all(by.id(id));;
        return elements.get(index);
    }

    async clickButtonById(id:string) {
        const button = this.getElementById(id);
        await button.click();
    }

    async setInputValueFromId(id:string, value:string) {
        const input = this.getElementById(id);
        await input.clear();
        await input.sendKeys(value);
    }

    async setInputValueFromIdAndIndex(id:string, index:number, value:string) {
        const input = this.getElementByIdAndIndex(id, index);
        await input.clear();
        await input.sendKeys(value);
    }

    async setSelectValueFromId(id:string, text:string) {
        const select = this.getElementById(id);
        await select.click();
        
        await element(by.cssContainingText('mat-option .mat-option-text', text)).click();
    }

    async clickLinkMenuById(id:string, text:string) {
        const select = this.getElementById(id);
        await select.click();
        
        await element(by.buttonText(text)).click();
    }
    
    async confirmDialog() {
        await this.clickButtonById('btnYes');
    }
}