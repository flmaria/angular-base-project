import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';

import { MatSnackBar } from '@angular/material/snack-bar';

describe('BaseComponent', () => {

  let baseComponent: BaseComponent;
  let snackBarSpy: any;
  
  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent', 'open']);
    
    baseComponent = new BaseComponent(snackBarSpy);
  });

  it('should call alert', () => {
    let message = 'user message alert';
    baseComponent.showAlert(message);
    expect(snackBarSpy.open).toHaveBeenCalledTimes(1);
  });

  it('should call error alert when received error with 400 status and array message', () => {
    let error = {status:400, error:['message error']};
    baseComponent.showErrorAlert(error);
    expect(snackBarSpy.openFromComponent).toHaveBeenCalledTimes(1);
  });
  
  it('should call error alert when received error with 404 status and message', () => {
    let error = {status:400, error:'message error'};
    baseComponent.showErrorAlert(error);
    expect(snackBarSpy.open).toHaveBeenCalledTimes(1);
  });
  
  it('should call error alert when received error with status different of 404 and message', () => {
    let error = {status:405, error:'message error'};
    baseComponent.showErrorAlert(error);
    expect(snackBarSpy.open).toHaveBeenCalledTimes(1);
  });

  it('should call error alert when received simple error', () => {
    let error = 'message error';
    baseComponent.showErrorAlert(error);
    expect(snackBarSpy.open).toHaveBeenCalledTimes(1);
  });

});
