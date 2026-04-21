import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  isCollapsed = false;

  constructor(private router: Router) {}

  logout() {
    // your logout logic
    this.router.navigate(['/login']);
  }
}
