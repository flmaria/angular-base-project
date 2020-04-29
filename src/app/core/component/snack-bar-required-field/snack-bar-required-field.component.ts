import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-required-field',
  templateUrl: './snack-bar-required-field.component.html',
  styleUrls: ['./snack-bar-required-field.component.css']
})
export class SnackBarRequiredFieldComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }


}
