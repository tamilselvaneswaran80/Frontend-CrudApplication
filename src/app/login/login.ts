import { Component } from '@angular/core';
//import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  ) {}

  login() {
    // 🔹 Check empty fields
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please enter Email and Password');
      return;
    }

    // 🔹 Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.loginData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // 🔹 Call API
    this.api.login(this.loginData).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);

        // 🔹 Check API response
        if (res) {
          alert('Login Success');

          // Example: save token if backend sends it
          if (res.token) {
            localStorage.setItem('token', res.token);
          }

          this.router.navigate(['/dashboard']);
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
}
