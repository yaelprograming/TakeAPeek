import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { UserDialogComponent } from './components/users/user-dialog/user-dialog.component';
import { UserComponent } from './components/users/user/user.component';
// import { UserManagementComponent } from './components/user-management/user-management.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'analytics', pathMatch: 'full' },
          { path: 'analytics', component: AnalyticsComponent },

         {path:'users-management', component:UserComponent},
        ],
      },    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];
