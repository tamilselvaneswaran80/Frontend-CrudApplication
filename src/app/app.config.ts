import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './auth.service';

import { NgxPermissionsModule } from 'ngx-permissions';

export const appConfig: ApplicationConfig = {
  providers: [
    // Router
    provideRouter(routes),

    // VERY IMPORTANT (this fixes your error)
    importProvidersFrom(NgxPermissionsModule.forRoot()),

    // Interceptor
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const auth = inject(AuthService);
          const token = auth.getToken();

          if (token) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
          }

          return next(req);
        },
      ]),
    ),
  ],
};
