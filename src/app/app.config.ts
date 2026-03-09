import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';
import { TasksState } from './store/tasks.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(NgxsModule.forRoot([TasksState]))
  ]
};
