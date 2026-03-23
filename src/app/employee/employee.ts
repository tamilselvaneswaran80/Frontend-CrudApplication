// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employee',
//   imports: [],
//   templateUrl: './employee.html',
//   styleUrl: './employee.css',
// })
// export class Employee {}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//mport { EmployeeService } from '../employee.service';
import { EmployeeService } from '../employee.service';
import { SignalRService } from '../signalr.service';
//import { EmployeeService } from './employee.service';
//import { SignalRService } from './signalr.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.html',
})
export class Employee implements OnInit {
  employees: any[] = [];
  newEmp: any = {};

  constructor(
    private empService: EmployeeService,
    private signalR: SignalRService,
  ) {}

  ngOnInit() {
    this.load();

    this.signalR.startConnection();

    this.signalR.addListener((action: string, emp: any) => {
      console.log(action, emp);
      this.load(); // refresh automatically
    });
  }

  load() {
    setTimeout(() => {
      this.empService.getAll().subscribe((res: any) => {
        this.employees = res;
      });
    }, 3000); // ⏳ 3 seconds delay before API call
  }

  add() {
    if (
      !this.newEmp.name ||
      !this.newEmp.role ||
      !this.newEmp.department ||
      this.newEmp.salary == null
    ) {
      alert('All fields are required');
      return;
    }

    this.empService.create(this.newEmp).subscribe({
      next: () => {
        this.newEmp = {
          name: '',
          role: '',
          department: '',
          salary: null,
        };
      },
      error: (err) => {
        console.error('Create Error:', err);
      },
    });
  }

  // isSaving = false;

  // add() {
  //   if (this.isSaving) return;

  //   this.isSaving = true;

  //   this.empService.create(this.newEmp).subscribe({
  //     next: () => {
  //       this.newEmp = {};
  //       this.isSaving = false;
  //     },
  //     error: () => {
  //       this.isSaving = false;
  //     },
  //   });
  // }

  // delete(id: number) {
  //   this.empService.delete(id).subscribe();
  // }
  delete(id: number) {
    this.empService.delete(id).subscribe({
      next: () => {
        console.log('Deleted');
        this.load(); // 🔥 refresh list
      },
      error: (err) => {
        console.error('Delete Error:', err);
      },
    });
  }
}
