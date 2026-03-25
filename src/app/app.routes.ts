import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { User } from './user/user';
import { ResetPassword } from './reset-password/reset-password';
import { AuthGuard } from './auth.guard';
import { SignupCrud } from './signup-crud/signup-crud';
import { Employees } from './employee/employee';
import { EmployeeSearch } from './employee-search/employee-search';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  //{ path: 'dashboard', component: Dashboard },
  { path: 'Users', component: User },
  { path: 'reset-password', component: ResetPassword },
  { path: 'signup-crud', component: SignupCrud },
  { path: 'employee', component: Employees },
  { path: 'employee-search', component: EmployeeSearch },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [AuthGuard],
    data: { permission: ['ADMIN', 'STUDENT'] },
  },
  {
    path: 'Users',

    loadComponent: () => import('./user/user').then((m) => m.User),
    canActivate: [AuthGuard],
    data: { permission: ['ADMIN'] },
  },
  { path: '**', redirectTo: 'login' }, // 🔥 IMPORTANT
];
