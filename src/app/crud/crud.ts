import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔥 Add this
  templateUrl: './crud.html',
})
export class crud {
  name = '';
  users: string[] = [];

  addUser() {
    this.users.push(this.name);
    this.name = '';
  }

  deleteUser(i: number) {
    this.users.splice(i, 1);
  }

  editUser(i: number) {
    this.name = this.users[i];
    this.users.splice(i, 1);
  }
}
