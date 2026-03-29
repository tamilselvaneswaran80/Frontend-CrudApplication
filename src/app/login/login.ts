import { Component } from '@angular/core';
//import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private api: UserService,
    private router: Router,
    private permission: NgxPermissionsService,
    private auth: AuthService,
  ) {}

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please enter Email and Password');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.loginData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    this.api.login(this.loginData).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);

        if (res && res.token) {
          const role = res.user.role?.toUpperCase(); // 🔥 normalize

          alert('Login Success');

          this.auth.setSession(res.token, role);
          this.permission.loadPermissions([role]);

          // ✅ Allowed roles
          const allowedRoles = ['ADMIN', 'STUDENT', 'TEACHER'];

          if (allowedRoles.includes(role)) {
            this.router.navigate(['/dashboard']);

            // ✅ allowed
          } else {
            alert('Access Denied ❌');
            this.router.navigate(['/login']); // ❌ not allowed
          }
        } else {
          alert('Invalid Email or Password');
        }
      },

      error: (err: any) => {
        console.error('Login Error:', err);
        alert('Invalid Email or Password');
      },
    });
  }
  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToSignupCrud() {
    this.router.navigate(['/signup-crud']);
  }
}
