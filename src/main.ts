import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { App } from './app/app';
import { AuthInterceptor } from './app/auth.interceptor';
import { routes } from './app/app.routes';
import { NgxPermissionsModule } from 'ngx-permissions';
import { provideRouter } from '@angular/router';
bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),

    provideRouter(routes),
    importProvidersFrom(NgxPermissionsModule.forRoot()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
