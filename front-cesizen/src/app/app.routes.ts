import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InformationListComponent } from './pages/information-list/information-list.component';
import { InformationDetailComponent } from './pages/information-detail/information-detail.component';
import { AdminComponent } from './pages/admin/admin.component';
import { InformationListAdminComponent } from './pages/admin/information-list-admin/information-list-admin.component';
import { InformationFormComponent } from './pages/admin/information-form/information-form.component';
import { LoginComponent } from './pages/login/login.component';
import { DiagnosticStressComponent } from './pages/diagnostic-stress/diagnostic-stress.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminCreateUserComponent } from './pages/admin-create-user/admin-create-user.component';
import { AdminGuard } from './guard/adminGuard';
import { AdminUserManagementComponent } from './pages/admin-user-management/admin-user-management.component';
import { StressConfigComponent } from './pages/stress-config/stress-config.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: InformationListComponent },
      { path: 'informations/:slug', component: InformationDetailComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'admin/informations', component: InformationListAdminComponent},
      { path: 'admin/informations/create', component: InformationFormComponent },
      { path: 'admin/informations/:id/edit', component: InformationFormComponent },
      { path: 'login', component: LoginComponent },
      { path: 'diagnostic-stress', component: DiagnosticStressComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'account', component: AccountComponent},
      { path: 'admin/create-users', component: AdminCreateUserComponent,},
      { path: 'admin/users', component: AdminUserManagementComponent,  },
      { path: 'admin/stress-config', component: StressConfigComponent}

    ]
  }
];

export const appRouting = provideRouter(routes);
