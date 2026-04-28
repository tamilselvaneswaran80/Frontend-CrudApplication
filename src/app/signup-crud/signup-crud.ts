// import { Component, OnInit, signal, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { UserService } from '../user.service';
// import { User } from '../models/signupcrud.model';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-signup-crud',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './signup-crud.html',
//   styleUrls: ['./signup-crud.css'],
// })
// export class SignupCrud implements OnInit {
//   // SIGNALS
//   allUsers = signal<User[]>([]);
//   currentPage = signal(1);
//   pageSize = 10;
//   totalPages = signal(0);
//   totalRecords = signal(0);
//   pages: number[] = [];

//   // Paginated users for display
//   users = computed(() => {
//     const start = (this.currentPage() - 1) * this.pageSize;
//     const end = start + this.pageSize;
//     return this.allUsers().slice(start, end);
//   });

//   totalRecords = computed(() => this.allUsers().length);
//   totalPages = computed(() => Math.ceil(this.allUsers().length / this.pageSize));

//   constructor(
//     private userService: UserService,
//     private router: Router,
//   ) {}

//   ngOnInit() {
//     this.getUsers();
//   }

//   // GET USERS
//   getUsers() {
//     this.userService.getUsers(this.currentPage(), this.pageSize).subscribe({
//       next: (res: User[]) => {
//         console.log('DATA:', res);
//         this.allUsers.set(res);
//         this.currentPage.set(1);
//         this.updatePages();
//       },
//       error: (err) => {
//         console.error('ERROR:', err);
//       },
//     });
//   }

//   updatePages() {
//     const total = this.totalPages();
//     this.pages = Array.from({ length: total }, (_, i) => i + 1);
//   }

//   //DELETE
//   deleteUser(id?: number) {
//     if (!id) return;

//     this.userService.deleteUser(id).subscribe(() => {
//       this.getUsers(); // refresh
//     });
//   }

//   getAvatarGradient(firstName: string, lastName: string): string {
//     const colors = [
//       ['#6366f1', '#3b82f6'],
//       ['#8b5cf6', '#6366f1'],
//       ['#ec4899', '#8b5cf6'],
//       ['#f59e0b', '#f97316'],
//       ['#10b981', '#06b6d4'],
//       ['#ef4444', '#f97316'],
//     ];
//     const seed = (firstName.charCodeAt(0) || 0) + (lastName.charCodeAt(0) || 0);
//     const pair = colors[seed % colors.length];
//     return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
//   }

//   // ================= PAGINATION =================
//   goToPage(page: number) {
//     this.currentPage.set(page);
//   }

//   nextPage() {
//     if (this.currentPage() < this.totalPages()) {
//       this.currentPage.set(this.currentPage() + 1);
//     }
//   }

//   prevPage() {
//     if (this.currentPage() > 1) {
//       this.currentPage.set(this.currentPage() - 1);
//       this.getUsers(); // 🔥 reload data
//     }
//   }
// }

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/signupcrud.model';
import { PagedResult } from '../models/paged-result.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup-crud.html',
  styleUrls: ['./signup-crud.css'],
})
export class SignupCrud implements OnInit {
  // ✅ SIGNALS
  users = signal<User[]>([]);
  currentPage = signal(1);
  pageSize = 5;

  totalPages = signal(0);
  totalRecords = signal(0);

  pages: number[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  // ✅ GET USERS (SERVER SIDE PAGINATION)
  getUsers() {
    this.userService.getUsers(this.currentPage(), this.pageSize).subscribe({
      next: (res: PagedResult<User>) => {
        console.log('DATA:', res);

        this.users.set(res.data);
        this.totalPages.set(res.totalPages);
        this.totalRecords.set(res.total);

        this.updatePages();
      },
      error: (err) => console.error(err),
    });
  }

  // ✅ UPDATE PAGE BUTTONS
  updatePages() {
    this.pages = Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  // ✅ DELETE
  deleteUser(id?: number) {
    if (!id) return;

    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  // ✅ AVATAR COLOR
  getAvatarGradient(firstName: string, lastName: string): string {
    const colors = [
      ['#6366f1', '#3b82f6'],
      ['#8b5cf6', '#6366f1'],
      ['#ec4899', '#8b5cf6'],
      ['#f59e0b', '#f97316'],
      ['#10b981', '#06b6d4'],
      ['#ef4444', '#f97316'],
    ];
    const seed = (firstName?.charCodeAt(0) || 0) + (lastName?.charCodeAt(0) || 0);

    const pair = colors[seed % colors.length];
    return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
  }

  // ================= PAGINATION =================

  goToPage(page: number) {
    this.currentPage.set(page);
    this.getUsers(); // 🔥 reload data
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.getUsers(); // 🔥 reload data
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.getUsers(); // 🔥 reload data
    }
  }
}
