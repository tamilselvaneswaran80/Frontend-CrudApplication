import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
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

  logout() {
    alert('Logged out successfully ✅');
    this.router.navigate(['/']);
  }
}
