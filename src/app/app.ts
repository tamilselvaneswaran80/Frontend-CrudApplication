import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './auth.service';
import { filter } from 'rxjs/operators';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  protected readonly title = signal('curd-application');

  showSidebar = true; // ✅ default visible

  constructor(
    private router: Router,
    private permission: NgxPermissionsService,
    private auth: AuthService,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;

        // ❌ hide sidebar ONLY for login page
        if (url.includes('login')) {
          this.showSidebar = false;
        }
        // ✅ show sidebar for ALL other pages (including signup)
        else {
          this.showSidebar = true;
        }
      });
  }

  ngOnInit() {
    const role = this.auth.getRole();

    this.permission.flushPermissions();

    if (role) {
      this.permission.loadPermissions([role]);
    }
  }
}
