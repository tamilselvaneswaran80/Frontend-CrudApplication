import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private api = 'https://localhost:7215/api/Employee';

  constructor(private http: HttpClient) {}

  getAll(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.api}/${id}`);
  }

  create(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.api}/create`, emp);
  }

  update(id: number, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.api}/update/${id}`, emp);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/delete/${id}`);
  }
}
