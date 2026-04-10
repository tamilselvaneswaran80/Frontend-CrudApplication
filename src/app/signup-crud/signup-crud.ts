import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/signupcrud.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup-crud.html',
  styleUrls: ['./signup-crud.css'],
})
export class SignupCrud implements OnInit {
  // ✅ SIGNAL (IMPORTANT)
  users = signal<User[]>([]);

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  //GET USERS
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res: User[]) => {
        console.log('DATA:', res);

        this.users.set(res); //set signal value
      },
      error: (err) => {
        console.error('ERROR:', err);
      },
    });
  }

  //DELETE
  deleteUser(id?: number) {
    if (!id) return;

    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers(); // refresh
    });
  }

  editUser(user: User) {
    console.log(user);
  }

  logoutsignup() {
    //Redirect to login page
    this.router.navigate(['/dashboard']);
  }
}
