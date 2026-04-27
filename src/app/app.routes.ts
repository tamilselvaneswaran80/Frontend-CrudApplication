import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { ResetPassword } from './reset-password/reset-password';
import { AuthGuard } from './auth.guard';
import { SignupCrud } from './signup-crud/signup-crud';
import { Employees } from './employee/employee';
import { EmployeeSearch } from './employee-search/employee-search';
import { Homepage } from './homepage/homepage';

// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: Login },
//   { path: 'signup', component: Signup },
//   { path: 'reset-password', component: ResetPassword },

//   {
//     path: 'homepage',
//     component: Homepage,
//     canActivate: [AuthGuard],
//     data: { permission: ['ADMIN', 'TEACHER'] },
//   },

//   {
//     path: 'signup-crud',
//     component: SignupCrud,
//     canActivate: [AuthGuard],
//     data: { permission: ['STUDENT', 'ADMIN'] },
//   },

//   {
//     path: 'employee',
//     component: Employees,
//     canActivate: [AuthGuard],
//     data: { permission: ['ADMIN', 'STUDENT'] },
//   },

//   {
//     path: 'employee-search',
//     component: EmployeeSearch,
//     canActivate: [AuthGuard],
//     data: { permission: ['ADMIN'] },
//   },

//   {
//     path: 'dashboard',
//     loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
//     canActivate: [AuthGuard],
//     data: { permission: ['ADMIN', 'STUDENT'] },
//   },

//   {
//     path: 'users',

//     loadComponent: () => import('./user/user').then((m) => m.User),
//     // canActivate: [AuthGuard],
//     // data: { permission: ['ADMIN'] },
//   },

//   { path: '**', redirectTo: 'login' }, //Important

// ];

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  { path: 'signup', component: Signup, data: { hideSidebar: false } },
  { path: 'reset-password', component: ResetPassword },

  // Protected routes
  {
    path: '',
    canActivate: [AuthGuard],
    data: { permission: ['ADMIN', 'STUDENT'] },
    children: [
      { path: 'homepage', component: Homepage },
      { path: 'signup-crud', component: SignupCrud },
      { path: 'employee', component: Employees },
      { path: 'employee-search', component: EmployeeSearch },

      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },

      {
        path: 'users',
        loadComponent: () => import('./user/user').then((m) => m.User),
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
