import { Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    // נתיב לעמוד ההתחברות
    { path: 'login', component: LoginComponent },
    
    // נתיב לדשבורד עם נתיבי משנה
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard], // הגנה על הנתיב באמצעות AuthGuard
      children: [
        // נתיב ברירת מחדל - מפנה לאנליטיקס
        { path: '', redirectTo: 'analytics', pathMatch: 'full' },
        
        // נתיבי המשנה של הדשבורד
        { path: 'users', component: UserManagementComponent },
        { path: 'settings', component: SystemSettingsComponent },
        { path: 'analytics', component: AnalyticsComponent },
      ],
    },
    
    // נתיב ברירת מחדל - מפנה לעמוד ההתחברות
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    
    // נתיב לכל כתובת אחרת - מפנה לעמוד ההתחברות
    { path: '**', redirectTo: '/login' },
  ];
