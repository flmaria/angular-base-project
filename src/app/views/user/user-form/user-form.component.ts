import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import { UserService } from '../user.service';
import { ProfileService } from '../../../core/services/profile.service';
import { User } from '../../../core/model/User';
import { Profile } from '../../../core/model/Profile';
import { Observable } from "rxjs";
import { BaseComponent } from 'src/app/core/component/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BaseComponent implements OnInit {

  id: number;
  actionDescription: string;

  profiles: Observable<Profile[]>;
  
  submitted = false;
  
  user: User = new User();
  
  @ViewChild("createForm") form: NgForm;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private profileService: ProfileService,
    public activatedRoute: ActivatedRoute,
    private router: Router) { 

      super(snackBar);
  }

  ngOnInit() {
    this.profiles = this.profileService.listAll();
    this.id = this.activatedRoute.snapshot.params['id'];
    
    if (this.id) {
      this.actionDescription = 'Update';
      
      this.userService.getUser(this.id)
      .subscribe(data => {
        this.user = data;
      }, error => this.showErrorAlert(error));
    }
    else {
      this.actionDescription = 'Add';
    }
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.form.valid) {
      if (this.id) {
        this.userService.updateUser(this.user)
        .subscribe(data => this.goBack(), error => this.showErrorAlert(error));
        this.user = new User();
      }
      else {
        this.userService.createUser(this.user)
        .subscribe(data => {
          this.goBack();    
        }, error => {
          this.showErrorAlert(error)
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/app/users']);
  }

}
