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

  togglePage() {
    this.showUser.set(!this.showUser());
  }

  studentlist = signal<Student>({
    studentId: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    age: 0,
    course: '',
    createdDate: new Date(),
  });

  students = signal<Student[]>([]);
  editIndex: number | null = null;
  totalRecords = signal(0);
  currentPage = signal(1);
  pageSize = 10;

  // Load students when page opens
  ngOnInit() {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
    this.getStudents();
  }

  // GET Students
  getStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students.set(data); //signal update
        this.totalRecords.set(data.length);
      },
      error: (err) => console.error(err),
    });
  }

  // SAVE Student
  saveStudent() {
    if (this.editIndex === null) {
      //New Student → set date
      this.studentlist.update((s) => ({
        ...s,
        createdDate: new Date(),
      }));
    }
    const studentData = { ...this.studentlist() };

    // VALIDATION (DO NOT CHECK ID)
    if (
      !studentData.firstname ||
      !studentData.lastname ||
      !studentData.phoneNumber ||
      !studentData.age ||
      !studentData.course
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (this.editIndex === null) {
      //REMOVE ID for CREATE
      delete (studentData as any).studentId;

      this.studentService.createStudent(studentData).subscribe({
        next: () => {
          this.getStudents(); // 🔥 reload data
        },
        error: (err) => {
          console.error('Create error:', err);
        },
      });
    } else {
      // UPDATE
      this.studentService.updateStudent(studentData.studentId, studentData).subscribe({
        next: () => {
          this.getStudents();
          this.editIndex = null;
        },
        error: (err) => {
          console.error('Update error:', err);
        },
      });
    }

    // RESET FORM
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
    if (!id || id === 0) {
      console.error('Invalid ID:', id);
      return;
    }

    if (this.isDeleting) return; //prevent double call

    this.isDeleting = true;

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.getStudents();
        this.isDeleting = false;
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.isDeleting = false;
      },
    });
  }
}
