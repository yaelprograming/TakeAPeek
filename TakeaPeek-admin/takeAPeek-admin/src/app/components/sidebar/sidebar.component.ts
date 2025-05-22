import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servies/auth/auth.service';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true,
})
export class SidebarComponent {

  
    @Input() collapsed = false;
  
    menuItems: MenuItem[] = [
      { title: 'אנליטיקה', icon: 'bar-chart', route: '/dashboard/analytics', active: false },
      { title: 'משתמשים', icon: 'users', route: '/dashboard/users-management', active: false },
      { title: 'הגדרות', icon: 'settings', route: '/dashboard/settings', active: false },
    ];
  
    constructor(
      private router: Router,
      private authService: AuthService,
    ) {}
  
    ngOnInit(): void {
      this.setActiveMenuItem();
    }
  
    setActiveMenuItem(): void {
      const currentUrl = this.router.url;
      this.menuItems.forEach((item) => {
        item.active = currentUrl.includes(item.route);
      });
    }
  
    navigateTo(route: string): void {
      this.router.navigate([route]);
      this.setActiveMenuItem();
    }
  
    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  
}
