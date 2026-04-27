import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employees implements OnInit {
  constructor(private empService: EmployeeService) {}

  // 🔹 LIVE TIME
  currentDateTime: Date = new Date();

  // 🔹 FORM
  employeeForm = signal<Employee>({
    id: 0,
    name: '',
    role: '',
    department: '',
    salary: 0,
    createdDate: new Date(),
  });

  // 🔹 LIST
  employees = signal<Employee[]>([]);

  editId: number | null = null;
  isDeleting = false;

  // 🔹 PAGINATION
  totalRecords = signal(0);
  totalPages = signal(0);
  currentPage = signal(1);
  pageSize = 10;
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

  // ================= SAVE =================
  saveEmployee() {
    if (this.editId === null) {
      this.employeeForm.update((e) => ({
        ...e,
        createdDate: new Date(),
      }));
    }

    const empData = { ...this.employeeForm() };

    // 🔹 VALIDATION
    if (!empData.name || !empData.role || !empData.department || empData.salary <= 0) {
      alert('Please fill all fields');
      return;
    }

    if (this.editId === null) {
      // CREATE
      delete (empData as any).id;

      this.empService.create(empData).subscribe({
        next: () => this.getEmployees(),
        error: (err) => console.error('Create error:', err),
      });
    } else {
      // UPDATE
      this.empService.update(this.editId, empData).subscribe({
        next: () => {
          this.getEmployees();
          this.editId = null;
        },
        error: (err) => console.error('Update error:', err),
      });
    }

    // 🔹 RESET FORM
    this.employeeForm.set({
      id: 0,
      name: '',
      role: '',
      department: '',
      salary: 0,
      createdDate: new Date(),
    });
  }

  // ================= EDIT =================
  editEmployee(emp: Employee) {
    this.employeeForm.set({ ...emp });
    this.editId = emp.id;
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
}
