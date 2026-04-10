import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
//import { User } from '../user/user';
//import { Employees } from '../employee/employee';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private user: UserService,
    private router: Router,
  ) {}

  openUsers() {
    this.router.navigate(['/Users']);
  }

  openHomePage() {
    this.router.navigate(['/homepage']);
  }

  openEmployee() {
    this.router.navigate(['/employee']);
  }

  openEmployeeDetails() {
    this.router.navigate(['/employee-search']);
  }

  SignupDetails() {
    this.router.navigate(['/signup-crud']);
  }

  logout() {
    alert('Logged out successfully');
    this.router.navigate(['/']);
  }
}
