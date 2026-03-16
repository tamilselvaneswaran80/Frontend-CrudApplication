import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { Login } from './login/login';
import { CommonModule } from '@angular/common';
//import { RouterOutlet } from '../../node_modules/@angular/router/types/_router_module-chunk';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('curd-application');
}
