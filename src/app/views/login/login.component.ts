import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { User } from '../../core/model/User';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserRegistrationDialogComponent } from '../dialog/user-registration-dialog/user-registration-dialog.component';
import { BaseComponent } from 'src/app/core/component/base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  login: any = {};
  formLogin: FormGroup;

  closeResult: string;

  user: User;

  constructor(formBuilder: FormBuilder, 
    private loginService: LoginService,
    private router: Router,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog) { 

    super(_snackBar);  

    this.formLogin = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    
  }
  
  loginPerfom() {
    const login = this.formLogin.controls['login'].value;
    const password = this.formLogin.controls['password'].value;
    
    if (this.formLogin.valid) {
      this.loginService.login(login, password).subscribe(
        result => {
          this.router.navigateByUrl('/app');
        },
        (err) => {
          if (err.status === 401) {
            this.showErrorAlert('Access denied!');
          } else {
            this.showErrorAlert(err.message);
          }
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 
}
