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
  // showStudent = signal(true);

  // togglePage() {
  //   this.showStudent.set(!this.showStudent());
  // }
  // 🔥 Signal for form
  employeeForm = signal<Employee>({
    id: 0,
    name: '',
    role: '',
    department: '',
    salary: 0,
  });

  // 🔥 Signal for list
  employees = signal<Employee[]>([]);

  editId: number | null = null;

  isDeleting = false; // prevent double delete
  totalRecords = signal(0);
  ngOnInit() {
    this.getEmployees();
  }

  // 🔹 GET
  getEmployees() {
    this.empService.getAll().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.totalRecords.set(data.length);
      },
      error: (err) => console.error(err),
    });
  }

  // 🔹 SAVE (ADD + UPDATE)
  saveEmployee() {
    const empData = { ...this.employeeForm() };

    // 🔥 Validation
    if (!empData.name || !empData.role || !empData.department || !empData.salary) {
      alert('Please fill all fields');
      return;
    }

    if (this.editId === null) {
      // 🔥 CREATE (remove id)
      delete (empData as any).id;

      this.empService.create(empData).subscribe({
        next: () => {
          this.getEmployees();
        },
        error: (err) => console.error('Create error:', err),
      });
    } else {
      // 🔥 UPDATE
      this.empService.update(this.editId, empData).subscribe({
        next: () => {
          this.getEmployees();
          this.editId = null;
        },
        error: (err) => console.error('Update error:', err),
      });
    }

    // 🔹 RESET
    this.employeeForm.set({
      id: 0,
      name: '',
      role: '',
      department: '',
      salary: 0,
    });
  }

  // 🔹 EDIT
  editEmployee(emp: Employee) {
    this.employeeForm.set({ ...emp });
    this.editId = emp.id;
  }

  // 🔹 DELETE
  deleteEmployee(id: number) {
    if (!id || id === 0) {
      console.error('Invalid ID:', id);
      return;
    }

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
}
