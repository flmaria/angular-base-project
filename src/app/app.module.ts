import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

import {MatMenuModule} from  '@angular/material/menu';
import {MatGridListModule} from  '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatSnackBarModule} from  '@angular/material/snack-bar';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatSelectModule} from  '@angular/material/select';
import {MatButtonModule} from  '@angular/material/button';
import {MatCardModule} from  '@angular/material/card';
import {MatSidenavModule} from  '@angular/material/sidenav';
import {MatIconModule} from  '@angular/material/icon';
import {MatListModule} from  '@angular/material/list';
import {MatTableModule} from  '@angular/material/table';
import {MatPaginatorModule} from  '@angular/material/paginator';
import {MatSortModule} from  '@angular/material/sort';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TokenHttpInterceptor } from './core/interceptors/token-http.interceptor';
import { SnackBarRequiredFieldComponent } from './core/component/snack-bar-required-field/snack-bar-required-field.component';

import { ForbiddenComponent } from './views/forbidden/forbidden.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { UserListComponent } from './views/user/user-list/user-list.component';
import { UserDetailsComponent } from './views/user/user-details/user-details.component';
import { UserFormComponent } from './views/user/user-form/user-form.component';
import { UserRegistrationDialogComponent } from './views/dialog/user-registration-dialog/user-registration-dialog.component';

import { MainComponent } from './main/main.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    LoginComponent,
    PageNotFoundComponent,
    MainComponent,
    HomeComponent,
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserRegistrationDialogComponent,
    SnackBarRequiredFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_Module_Options),
    BrowserAnimationsModule,
    
    FlexLayoutModule,

    MatMenuModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule

  ],
  providers: [
    
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
