import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../models/student.model';
import { RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { NgxPermissionsModule } from 'ngx-permissions';
@Component({
  selector: 'app-Users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPermissionsModule],
  templateUrl: './user.html',
})
export class User implements OnInit {
  constructor(private studentService: StudentService) {}

  studentlist = signal<Student>({
    studentId: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    age: 0,
    course: '',
  });

  students = signal<Student[]>([]);
  editIndex: number | null = null;

  // Load students when page opens
  ngOnInit() {
    this.getStudents();
  }

  // GET Students
  getStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students.set(data); // 🔥 signal update
      },
      error: (err) => console.error(err),
    });
  }

  // SAVE Student
  saveStudent() {
    const studentData = { ...this.studentlist() };

    // 🔥 VALIDATION (DO NOT CHECK ID)
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
      // 🔥 REMOVE ID for CREATE
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

    if (this.isDeleting) return; // 🔥 prevent double call

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
