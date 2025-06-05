import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InformationListComponent } from './pages/information-list/information-list.component';
import { InformationDetailComponent } from './pages/information-detail/information-detail.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: InformationListComponent },
      { path: 'informations/:slug', component: InformationDetailComponent },
      { path: 'admin', component: AdminComponent }
    ]
  }
];

export const appRouting = provideRouter(routes);
