import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setSession(token: string, role: string) {
    //debugger;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const role = localStorage.getItem('role');

    if (!role || role === 'null' || role === 'undefined') {
      return null;
    }

    console.log('Getting Role:', role);
    return role;
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
  }
}
