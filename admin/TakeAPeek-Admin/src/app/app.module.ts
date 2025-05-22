import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CommonModule,
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    UserManagementComponent,
    UserFormComponent,
    SystemSettingsComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
