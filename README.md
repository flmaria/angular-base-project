# Angular-Base-Project

Study Angular resources and develop unit and integration tests (e2e)

## What does the project do?

The following features have been developed:

* Application design uses Angular Material and Flex Layout (Flex Box);
* End-point consumption through authentication token transmission;
* Login screen for user authentication;
* Registration of a new user from the login screen;
* Dynamic menu with the permissions of the authenticated user;
* User registration with CRUD operations;
* Unit tests with mock for all components;
* Integrated tests (e2e) with persistence in back-end layer;

It uses the [springboot-base-project](https://github.com/flmaria/springboot-base-project) project as a back-end layer.

## Resources Used

* Angular CLI 9;
* Angular 9;
* Angular JWT;
* Type Script;
* Jasmine (Unit Tests);
* Protractor (e2e Tests)

## Inicialization

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Back-end layer initialization 

Follow [springboot-base-project](https://github.com/flmaria/springboot-base-project) instructions.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running AngularBaseProject unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running AngularBaseProject end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Packages installed in his project:

npm install @auth0/angular-jwt

npm install @angular/localize --save

ng add @angular/material

npm install --save hammerjs

npm install @angular/flex-layout @angular/cdk --save
