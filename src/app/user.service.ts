import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api = 'https://localhost:7215/api/Crud';

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }

  logout() {
    localStorage.clear();
  }

  getUsers() {
    return this.http.get(this.api);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
  resetPassword(id: number, data: any) {
    return this.http.put(`https://localhost:7215/api/Crud/reset-password/${id}`, data);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }
}
