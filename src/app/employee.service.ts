import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  api = 'https://localhost:7215/api/Employee';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api);
  }

  create(emp: any) {
    return this.http.post(this.api, emp);
  }

  update(id: number, emp: any) {
    return this.http.put(`${this.api}/${id}`, emp);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
