import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | any {
    const permissions = route.data?.['permission'];
    let userRole = this.auth.getRole();

    console.log('User Role:', userRole);
    console.log('Required permissions:', permissions);

    if (route.routeConfig?.path === 'login') {
      return true;
    }
    //No role → go to login
    if (!userRole) {
      alert('No role found');
      return this.router.createUrlTree(['/login']);
    }

    // Normalize
    userRole = userRole.toUpperCase();

    //No permission → go to login
    if (permissions && permissions.length === 0) {
      return this.router.createUrlTree(['/dashboard']);
    }

    if (!permissions.includes(userRole)) {
      alert('Access Denied');
      return this.router.createUrlTree(['/login']);
    }
    return true;
  }
}
