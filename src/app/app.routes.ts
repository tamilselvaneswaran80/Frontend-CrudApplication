import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { ResetPassword } from './reset-password/reset-password';
import { AuthGuard } from './auth.guard';
import { SignupCrud } from './signup-crud/signup-crud';
import { Employees } from './employee/employee';
import { EmployeeSearch } from './employee-search/employee-search';
import { Homepage } from './homepage/homepage';

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
        path: 'student-form',
        loadComponent: () => import('./student-form/student-form').then((m) => m.StudentForm),
      },
      {
        path: 'employee-form',
        loadComponent: () => import('./employee-form/employee-form').then((m) => m.EmployeeForm),
      },

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
