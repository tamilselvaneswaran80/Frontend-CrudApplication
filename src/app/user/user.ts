import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../models/student.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-Users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user.html',
})
export class User {
  studentlist = signal<Student>({
    studentId: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    age: 0,
    course: '',
  });

  students: Student[] = [];
  editIndex: number | null = null;

  saveStudent() {
    const studentData = this.studentlist();

    if (this.editIndex === null) {
      studentData.studentId = this.students.length + 1;
      this.students.push({ ...studentData });
    } else {
      this.students[this.editIndex] = { ...studentData };
      this.editIndex = null;
    }

    this.studentlist.set({
      studentId: 0,
      firstname: '',
      lastname: '',
      phoneNumber: '',
      age: 0,
      course: '',
    });
  }

  editStudent(index: number) {
    const student = this.students[index];

    this.studentlist.set({ ...student });

    this.editIndex = index;
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }
}
