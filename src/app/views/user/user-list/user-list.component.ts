import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { merge } from "rxjs";
import { Router, Data } from '@angular/router';

import { UserService } from '../user.service'

import { AuthService } from 'src/app/core/guards/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { UserDataSource } from '../user-data-source';
import { tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { BaseComponent } from 'src/app/core/component/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit, AfterViewInit{

  dataSource: UserDataSource;
  displayedColumns = ['name', 'login', 'email', 'Operations'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private snackBar: MatSnackBar, 
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) {
      super(snackBar);
  }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.userService);
    this.dataSource.loadUsers(0, 50, '', '');  
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
         tap((count) => {
            this.paginator.length = count;
         })
      )
      .subscribe();
 
      this.paginator.page
      .pipe(
         tap(() => this.reloadData())
      )
      .subscribe();

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.reloadData())
      )
      .subscribe();
  }  

  reloadData() {
    this.dataSource.loadUsers(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction);
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: 'Delete user?'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result && result == 'yes') {
        this.userService.deleteUser(id)
        .subscribe(
          data => {
            this.reloadData();
          },
          error => this.showErrorAlert(error));
      }
    });
  }

  userDetails(id: number){
    this.router.navigate(['app/users/details', id]);
  }

  userUpdate(id: number){
    this.router.navigate(['app/users/update', id]);
  }

}
