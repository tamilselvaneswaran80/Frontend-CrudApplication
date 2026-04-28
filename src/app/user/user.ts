import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../models/student.model';
import { RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Employees } from '../employee/employee';

@Component({
  selector: 'app-Users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPermissionsModule, Employees],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
  constructor(private studentService: StudentService) {}

  showUser = signal(true);
  currentDateTime: Date = new Date();

  //  TABLE DATA
  students = signal<Student[]>([]);

  //  PAGINATION
  totalRecords = signal(0);
  totalPages = signal(0);
  currentPage = signal(1);
  pageSize = 5;
  pages: number[] = [];

  //  TOGGLE
  togglePage() {
    this.showUser.set(!this.showUser());
  }

  ngOnInit() {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);

    this.getStudents();
  }

  //  GET WITH PAGINATION
  getStudents() {
    this.studentService.getStudents(this.currentPage(), this.pageSize).subscribe({
      next: (res: any) => {
        console.log('API:', res);

        //  IMPORTANT (match backend)
        const total = res.totalCount ?? res.total ?? 0;

        this.students.set(res.data ?? []);
        this.totalRecords.set(total);

        const totalPages = Math.ceil(total / this.pageSize);
        this.totalPages.set(totalPages);

        // create page numbers
        this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      },
      error: (err) => console.error('Update error:', err),
    });
  }

  // DELETE
  isDeleting = false;

  deleteStudent(id: number) {
    if (!id || id === 0) return;

    if (this.isDeleting) return;

    this.isDeleting = true;

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.getStudents();
        this.isDeleting = false;
      },
      error: (err) => {
        console.error(err);
        this.isDeleting = false;
      },
    });
  }

  //  PAGINATION FUNCTIONS
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.getStudents();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.getStudents();
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.getStudents();
  }

  getAvatarGradient(firstName: string, lastName: string): string {
    const colors = [
      ['#6366f1', '#3b82f6'],
      ['#8b5cf6', '#6366f1'],
      ['#ec4899', '#8b5cf6'],
      ['#f59e0b', '#f97316'],
      ['#10b981', '#06b6d4'],
      ['#ef4444', '#f97316'],
    ];
    const seed = (firstName?.charCodeAt(0) || 0) + (lastName?.charCodeAt(0) || 0);
    const pair = colors[seed % colors.length];
    return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
  }
}
