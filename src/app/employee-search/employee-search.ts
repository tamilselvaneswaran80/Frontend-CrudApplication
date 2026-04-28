import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-search.html',
  styleUrl: './employee-search.scss',
})
export class EmployeeSearch {
  constructor(
    private empService: EmployeeService,
    private router: Router,
  ) {}

  searchId: number = 0;

  employee = signal<Employee | null>(null);
  notFound = false;

  // 🔹 GET BY ID
  getEmployeeById() {
    if (!this.searchId || this.searchId <= 0) {
      alert('Please enter valid ID');
      return;
    }

    this.empService.getById(this.searchId).subscribe({
      next: (res) => {
        this.employee.set(res);
        this.notFound = false;
      },
      error: () => {
        this.employee.set(null);
        this.notFound = true;
      },
    });
  }

  clearData() {
    this.searchId = 0;
    this.employee.set(null);
    this.notFound = false;
  }

  logoutData() {
    this.router.navigate(['/dashboard']);
  }

  getAvatarGradient(name: string): string {
    const colors = [
      ['#6366f1', '#3b82f6'],
      ['#8b5cf6', '#6366f1'],
      ['#ec4899', '#8b5cf6'],
      ['#f59e0b', '#f97316'],
      ['#10b981', '#06b6d4'],
      ['#ef4444', '#f97316'],
    ];
    const seed = name ? name.charCodeAt(0) : 0;
    const pair = colors[seed % colors.length];
    return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
  }
}
