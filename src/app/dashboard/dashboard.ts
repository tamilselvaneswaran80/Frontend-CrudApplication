import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  isCollapsed = false;

  constructor(
    private user: UserService,
    private router: Router,
  ) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    alert('Logged out successfully');
    this.router.navigate(['/']);
  }
}
