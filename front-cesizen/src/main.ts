import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { appRouting } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    appRouting,
    importProvidersFrom(HttpClientModule)
  ]
});
