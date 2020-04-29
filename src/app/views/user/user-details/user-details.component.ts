import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../core/model/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: User = new User();

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.userService.getUser(this.id)
      .subscribe(data => {
        this.user = data;
      }, error => console.log(error));
  }

  goBack(){
    this.router.navigate(['app/users']);
  }

}
