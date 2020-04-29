import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForbiddenComponent } from './views/forbidden/forbidden.component';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';

import { HomeComponent } from './views/home/home.component';

import { AuthGuardService as AuthGuard } from './core/guards/auth-guard.service';

import { UserDetailsComponent } from './views/user/user-details/user-details.component';
import { UserFormComponent } from './views/user/user-form/user-form.component';
import { UserListComponent } from './views/user/user-list/user-list.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: 'app', component: MainComponent, children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard],
        data: {
              expectedRole: 'ROLE_USER_LIST'
            }
      },
      
      //----- Users
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_USER_LIST'
        } 
      },
      { path: 'users/add', component: UserFormComponent, canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_USER_SAVE'
        } 
      },
      { path: 'users/update/:id', component: UserFormComponent, canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_USER_UPDATE'
        } 
      },
      { path: 'users/details/:id', component: UserDetailsComponent, canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_USER_LIST'
        } 
      },
      
      { path: 'forbidden', component: ForbiddenComponent }
    ]
  },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
