import { Component } from '@angular/core';
//import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  constructor(
    private api: UserService,
    private router: Router,
  ) {}

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
  };
  signup() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(this.user.email)) {
      alert('Invalid Email');
      return;
    }

    if (this.user.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (!phonePattern.test(this.user.phoneNumber)) {
      alert('Phone number must be 10 digits');
      return;
    }

    this.api.signup(this.user).subscribe({
      next: (res: any) => {
        alert('Signup Successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Signup Failed');
      },
    });
  }
  goBack() {
    this.router.navigate(['/login']);
  }
}
