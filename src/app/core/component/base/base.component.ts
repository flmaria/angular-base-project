import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarRequiredFieldComponent } from '../snack-bar-required-field/snack-bar-required-field.component';
import { JsonUtils } from '../../util/json-util';

export class BaseComponent  {
  
  private jsonUtils: JsonUtils = new JsonUtils();
  
  constructor(public _snackBar: MatSnackBar) { }


  //###### Alert ####################################
  public showAlert(message:any) {
    var snackStyle: string = 'green-snackbar';

    this._snackBar.open(message, null, {
      duration: 2000,
      panelClass: snackStyle
    });
  }

  public showErrorAlert(error: any) {
    var snackStyle: string = 'red-snackbar';
    
    console.log(error);

    if (error.error) {
      if (error.status == 400) {
        let errorFromJson = null;

        if (this.jsonUtils.IsJsonString(error.error)) {
          errorFromJson = this.jsonUtils.parse(error.error);
        }
        
        if (error.error instanceof Array) {
          this._snackBar.openFromComponent(SnackBarRequiredFieldComponent, {
            data: error.error,
            duration: 2000,
            panelClass: snackStyle
          });
        }
        else if (errorFromJson instanceof Array) {
          this._snackBar.openFromComponent(SnackBarRequiredFieldComponent, {
            data: errorFromJson,
            duration: 2000,
            panelClass: snackStyle
          });
        }
        else {
          this._snackBar.open(error.error, null, {
            duration: 2000,
            panelClass: snackStyle
          });
        }
      }
      else {
        this._snackBar.open(error.error, null, {
          duration: 2000,
          panelClass: snackStyle
        });
      }
    }
    else {
      this._snackBar.open(error, null, {
        duration: 2000,
        panelClass: snackStyle
      });
    }
  }

}
