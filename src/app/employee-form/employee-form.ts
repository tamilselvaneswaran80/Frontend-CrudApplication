import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm implements OnInit {
  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  editId: number | null = null;
  isLoading = false;

  roles = ['Manager', 'Developer', 'Designer', 'HR', 'QA', 'DevOps', 'Analyst'];
  departments = ['Engineering', 'Design', 'HR', 'Marketing', 'Finance', 'Operations', 'Sales'];

  employee = signal<Employee>({
    id: 0,
    name: '',
    role: '',
    department: '',
    salary: 0,
    createdDate: new Date(),
  });

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('editId');
      if (id) {
        this.editId = Number(id);
        this.loadEmployee(this.editId);
      }
    });
  }

  loadEmployee(id: number) {
    this.isLoading = true;
    this.empService.getById(id).subscribe({
      next: (res) => {
        this.employee.set(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  saveEmployee() {
    const empData = { ...this.employee() };

    if (!empData.name || !empData.role || !empData.department || empData.salary <= 0) {
      alert('Please fill all fields');
      return;
    }

    if (this.editId === null) {
      delete (empData as any).id;
      empData.createdDate = new Date();

      this.empService.create(empData).subscribe({
        next: () => this.router.navigate(['/employee']),
        error: (err) => console.error(err),
      });
    } else {
      this.empService.update(this.editId, empData).subscribe({
        next: () => this.router.navigate(['/employee']),
        error: (err) => console.error(err),
      });
    }
  }

  cancel() {
    this.router.navigate(['/employee']);
  }
}
