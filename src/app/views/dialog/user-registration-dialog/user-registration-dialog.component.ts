import { Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './../../login/login.service';
import { User } from './../../../core/model/User';

import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/core/component/base/base.component';

@Component({
  selector: 'app-user-registration-dialog',
  templateUrl: './user-registration-dialog.component.html',
  styleUrls: ['./user-registration-dialog.component.css']
})
export class UserRegistrationDialogComponent extends BaseComponent implements OnInit {

  formCreate: FormGroup;
  
  constructor(public _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserRegistrationDialogComponent>,
    private formBuilder: FormBuilder, 
    private loginService: LoginService) {

    super(_snackBar);

    this.formCreate = formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }


  ngOnInit() {
  
  }

  createUser() {
    if (this.formCreate.valid) {
      var user:User = Object.assign({}, this.formCreate.value);

      this.loginService.register(user).subscribe(
        (response) => {
          this.showAlert('Account created!');
          this.dialogRef.close();
        },
        (err) => {
          this.showErrorAlert(err);
        });
    }
  }
  
  close(): void {
    this.dialogRef.close();
  }

}
