import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  protected readonly title = signal('curd-application');

  constructor(
    private permission: NgxPermissionsService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    const role = this.auth.getRole();

    this.permission.flushPermissions(); // 🧹 clear old

    if (role) {
      this.permission.loadPermissions([role]);
    }
  }
}
