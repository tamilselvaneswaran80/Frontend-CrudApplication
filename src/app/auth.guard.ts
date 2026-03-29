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

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // ✅ Check login

    // ✅ Get permission from route
    const permissions = route.data?.['permission'];

    // ✅ Get user role
    let userRole = this.auth.getRole();

    console.log('User Role:', userRole);
    console.log('Required permissions:', permissions);

    // ✅ If no role found
    if (!userRole) {
      alert('No role found ❌');
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Normalize (IMPORTANT)
    userRole = userRole.toUpperCase();

    // ✅ If route has roles, check access
    if (permissions && permissions.length) {
      if (!permissions.includes(userRole)) {
        alert('Access Denied ❌');
        //this.router.navigate(['/login']);
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    return true;
  }
}
