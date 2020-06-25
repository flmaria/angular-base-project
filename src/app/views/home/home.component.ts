import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/component/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit() {
  }

}
