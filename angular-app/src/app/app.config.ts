import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { appEffects, appStore } from '../store/store';
import { EmployeeService } from '../services/employee.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/httpInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(appStore),
    provideEffects(appEffects),
    provideHttpClient(withInterceptors([httpInterceptor])),
    EmployeeService,
  ],
};
