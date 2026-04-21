import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage implements OnInit {
  totalStudents: number = 0;
  totalEmployees: number = 0;

  constructor(
    private studentService: StudentService,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts() {
    this.studentService.getStudents().subscribe((res: any[]) => {
      this.totalStudents = res.length;
    });

    this.employeeService.getAll(1, 10).subscribe((res) => {
      this.totalEmployees = res.totalCount;
    });
  }
}
