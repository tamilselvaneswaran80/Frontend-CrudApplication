import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  resetData = {
    id: 0,
    email: '',
    newPassword: '',
  };

  constructor(
    private api: UserService,
    private router: Router,
  ) {}

  resetPassword() {
    if (!this.resetData.id || !this.resetData.email || !this.resetData.newPassword) {
      alert('Please fill all fields');
      return;
    }

    this.api
      .resetPassword(this.resetData.id, {
        email: this.resetData.email,
        newPassword: this.resetData.newPassword,
      })
      .subscribe({
        next: (res: any) => {
          alert(res.message);
          this.router.navigate(['/login']);
        },

        error: (err: any) => {
          alert('User not found');
          console.error(err);
        },
      });
  }
}
