import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employees implements OnInit {
  constructor(private empService: EmployeeService) {}

  // 🔹 LIVE TIME
  currentDateTime: Date = new Date();

  // 🔹 LIST
  employees = signal<Employee[]>([]);

  isDeleting = false;

  // 🔹 PAGINATION
  totalRecords = signal(0);
  totalPages = signal(0);
  currentPage = signal(1);
  pageSize = 5;
  pages: number[] = [];

  // ================= INIT =================
  ngOnInit() {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);

    this.getEmployees();
  }

  // ================= GET =================
  getEmployees() {
    this.empService.getAll(this.currentPage(), this.pageSize).subscribe({
      next: (res: any) => {
        console.log('API:', res);

        // ✅ FIX: use fallback safely
        const total = res.totalCount ?? res.total ?? 0;

        this.employees.set(res.data ?? []);
        this.totalRecords.set(total);

        const totalPages = Math.ceil(total / this.pageSize);
        this.totalPages.set(totalPages);

        this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      },
      error: (err) => console.error(err),
    });
  }

  // ================= DELETE =================
  deleteEmployee(id: number) {
    if (!id || id === 0) return;
    if (this.isDeleting) return;

    if (confirm('Are you sure you want to delete?')) {
      this.isDeleting = true;

      this.empService.delete(id).subscribe({
        next: () => {
          this.getEmployees();
          this.isDeleting = false;
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.isDeleting = false;
        },
      });
    }
  }

  // ================= PAGINATION =================

  goToPage(page: number) {
    this.currentPage.set(page);
    this.getEmployees();
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.getEmployees();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.getEmployees();
    }
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
