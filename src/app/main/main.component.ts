import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/guards/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private guard: AuthService) { }

  items: any[];

  ngOnInit() {
    this.items = new Array();

    const allMenus = [
      { label: 'Users', routerLink: 'users', expectedRole: 'ROLE_USER_LIST' }
    ];

    allMenus.forEach((menu) => {
      if (this.guard.isAuthorized(menu.expectedRole)) {
        const menuItem = { label: menu.label, routerLink: menu.routerLink };
        this.items.push(menuItem);
      }
    });
  }

  logout() {
    window.location.href = '/';
    localStorage.clear();
  }

}
