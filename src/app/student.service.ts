// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Student } from './models/student.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class StudentService {
//   apiUrl = 'https://localhost:7215/api/Student';

//   constructor(private http: HttpClient) {}

//   // GET
//   getStudents(): Observable<Student[]> {
//     return this.http.get<Student[]>(this.apiUrl);
//   }

//   // GET BY ID
//   getStudent(id: number) {
//     return this.http.get<any>(`https://localhost:7215/api/Student/${id}`);
//   }

//   // CREATE
//   createStudent(student: Student) {
//     return this.http.post(this.apiUrl, student);
//   }

//   // UPDATE
//   updateStudent(id: number, student: Student) {
//     return this.http.put(`${this.apiUrl}/${id}`, student);
//   }

//   // DELETE
//   deleteStudent(id: number) {
//     return this.http.delete(`https://localhost:7215/api/Student/${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiUrl = 'https://localhost:7215/api/Student';

  constructor(private http: HttpClient) {}

  // GET ALL (handles {data, total})
  getStudents(page: number, pageSize: number) {
    return this.http.get<any>(
      `https://localhost:7215/api/Student?page=${page}&pageSize=${pageSize}`,
    );
  }

  // GET BY ID
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  // CREATE
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // UPDATE
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  // DELETE
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
