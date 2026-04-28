import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss',
})
export class StudentForm implements OnInit {
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  editId: number | null = null;
  isLoading = false;

  student = signal<Student>({
    studentId: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    age: 0,
    course: '',
    createdDate: new Date(),
  });

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('editId');
      if (id) {
        this.editId = Number(id);
        this.loadStudent(this.editId);
      }
    });
  }

  loadStudent(id: number) {
    this.isLoading = true;
    this.studentService.getStudent(id).subscribe({
      next: (res) => {
        this.student.set(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  saveStudent() {
    const studentData = { ...this.student() };

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

    if (this.editId === null) {
      delete (studentData as any).studentId;
      studentData.createdDate = new Date();

      this.studentService.createStudent(studentData).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => console.error(err),
      });
    } else {
      this.studentService.updateStudent(this.editId, studentData).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => console.error(err),
      });
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
