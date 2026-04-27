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

  //  FORM DATA
  studentlist = signal<Student>({
    studentId: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    age: 0,
    course: '',
    createdDate: new Date(),
  });

  //  TABLE DATA
  students = signal<Student[]>([]);

  editIndex: number | null = null;

  //  PAGINATION
  totalRecords = signal(0);
  totalPages = signal(0);
  currentPage = signal(1);
  pageSize = 10;
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

  //  SAVE
  saveStudent() {
    if (this.editIndex === null) {
      this.studentlist.update((s) => ({
        ...s,
        createdDate: new Date(),
      }));
    }

    const studentData = { ...this.studentlist() };

    if (
      !studentData.firstname ||
      !studentData.lastname ||
      !studentData.phoneNumber ||
      !studentData.age ||
      !studentData.course
    ) {
      alert('Please fill all fields');
      return;
    }

    if (this.editIndex === null) {
      delete (studentData as any).studentId;

      this.studentService.createStudent(studentData).subscribe({
        next: () => this.getStudents(),
        error: (err) => console.error(err),
      });
    } else {
      this.studentService.updateStudent(studentData.studentId, studentData).subscribe({
        next: () => {
          this.getStudents();
          this.editIndex = null;
        },
        error: (err) => console.error(err),
      });
    }

    // reset form
    this.studentlist.set({
      studentId: 0,
      firstname: '',
      lastname: '',
      phoneNumber: '',
      age: 0,
      course: '',
      createdDate: new Date(),
    });
  }

  // EDIT
  editStudent(student: Student) {
    this.studentlist.set({ ...student });
    this.editIndex = student.studentId;
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
}
