// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
// import { AnalyticsService } from '../../servies/analytics.service';

// @Component({
//   selector: 'app-analytics',
//   standalone: true,
//   imports: [CommonModule, NgxChartsModule,ReactiveFormsModule],
//   templateUrl: './analytics.component.html',
//   styleUrl: './analytics.component.css'
// })
// export class AnalyticsComponent implements OnInit {
// // נתוני סטטיסטיקה מהירה
// summaryStats = {
//   totalUsers: 0,
//   totalFiles: 0,
//   totalStorage: 0,
//   totalCollages: 0
// };

// // נתוני גרפים
// fileUploadData: any[] = [];
// storageUsageData: any[] = [];
// userActivityData: any[] = [];
// collageCreationData: any[] = [];

// // פעילות אחרונה
// recentActivities: any[] = [];

// // אפשרויות גרפים
// view: [number, number] = [700, 300];
// showXAxis = true;
// showYAxis = true;
// gradient = false;
// showLegend = true;
// showXAxisLabel = true;
// showYAxisLabel = true;
// timeline = true;

// // תקופת זמן לניתוח
// timeRangeControl = new FormControl('30');

// // סכמת צבעים
// colorScheme = {
//   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
//   name: 'cool',
//   selectable: true,
//   group: ScaleType.Ordinal // כך זה נכון
// };
// isLoading = true;

// constructor(private analyticsService: AnalyticsService) {}

// ngOnInit(): void {
//   this.loadAnalyticsData();
  
//   // האזנה לשינויים בטווח הזמן
//   this.timeRangeControl.valueChanges.subscribe(value => {
//     if (value) {
//       this.loadAnalyticsData(+value);
//     }
//   });
// }

// loadAnalyticsData(days: number = 30): void {
//   this.isLoading = true;
  
//   // טעינת סטטיסטיקה מהירה
//   this.analyticsService.getSummaryStats().subscribe({
//     next: (data:any) => {
//       this.summaryStats = data;
//     },
//     error: (error:any) => {
//       console.error('שגיאה בטעינת סטטיסטיקה', error);
//     }
//   });
  
//   // טעינת נתוני העלאות קבצים
//   this.analyticsService.getFileUploadStats(days).subscribe({
//     next: (data:any) => {
//       this.fileUploadData = data;
//       this.isLoading = false;
//     },
//     error: (error:any) => {
//       console.error('שגיאה בטעינת נתוני העלאות', error);
//       this.isLoading = false;
//     }
//   });
  
//   // טעינת נתוני שימוש באחסון
//   this.analyticsService.getStorageUsageStats().subscribe({
//     next: (data:any) => {
//       this.storageUsageData = data;
//     },
//     error: (error:any) => {
//       console.error('שגיאה בטעינת נתוני אחסון', error);
//     }
//   });
  
//   // טעינת נתוני פעילות משתמשים
//   this.analyticsService.getUserActivityStats(days).subscribe({
//     next: (data:any) => {
//       this.userActivityData = data;
//     },
//     error: (error:any) => {
//       console.error('שגיאה בטעינת נתוני פעילות משתמשים', error);
//     }
//   });
  
//   // טעינת נתוני יצירת קולאז'ים
//   this.analyticsService.getCollageCreationStats(days).subscribe({
//     next: (data:any) => {
//       this.collageCreationData = data;
//     },
//     error: (error:any) => {
//       console.error('שגיאה בטעינת נתוני קולאז\'ים', error);
//     }
//   });
  
//   // טעינת פעילות אחרונה
//   this.analyticsService.getRecentActivities().subscribe({
//     next: (data:any) => {
//       this.recentActivities = data;
//     },
//     error: (error:any) => {
//       console.error('שגיאה בטעינת פעילות אחרונה', error);
//     }
//   });
// }

// formatStorageSize(bytes: number): string {
//   if (bytes === 0) return '0 Bytes';
  
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
  
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// }

// onResize(event: any): void {
//   this.view = [event.target.innerWidth / 1.35, 300];
// }
// getActivityIcon(type: string): string {
//   switch (type) {
//     case 'login': return 'log-in';
//     case 'upload': return 'upload';
//     case 'delete': return 'trash';
//     case 'collage': return 'image';
//     default: return 'activity';
//   }
// }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { AnalyticsService } from '../../servies/analytics/analytics.service';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, ReactiveFormsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  summaryStats = {
    totalUsers: 0,
    totalFiles: 0,
    totalStorage: 0,
    totalCollages: 0
  };

  fileUploadData: any[] = [];
  storageUsageData: any[] = [];
  userActivityData: any[] = [];
  collageCreationData: any[] = [];
  recentActivities: any[] = [];

  view: [number, number] = [700, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  timeline = true;

  timeRangeControl = new FormControl('30');

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal
  };

  isLoading = true;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalyticsData();

    this.timeRangeControl.valueChanges.subscribe(value => {
      if (value) {
        this.loadAnalyticsData(+value);
      }
    });
  }

  loadAnalyticsData(days: number = 30): void {
    this.isLoading = true;

    this.analyticsService.getSummaryStats().subscribe({
      next: (data: any) => {
        this.summaryStats = data;
      },
      error: (error: any) => {
        console.error('שגיאה בטעינת סטטיסטיקה', error);
      }
    });

    this.analyticsService.getFileUploadStats(days).subscribe({
      next: (data: any) => {
        this.fileUploadData = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('שגיאה בטעינת נתוני העלאות', error);
        this.isLoading = false;
      }
    });

    this.analyticsService.getStorageUsageStats().subscribe({
      next: (data: any) => {
        this.storageUsageData = data;
      },
      error: (error: any) => {
        console.error('שגיאה בטעינת נתוני אחסון', error);
      }
    });

    this.analyticsService.getUserActivityStats(days).subscribe({
      next: (data: any) => {
        // סינון רק משתמשים שהתחברו לפחות פעם אחת בטווח הזמן
        this.userActivityData = data.filter((u: any) => u.loginCount > 0);
      },
      error: (error: any) => {
        console.error('שגיאה בטעינת נתוני פעילות משתמשים', error);
      }
    });

    this.analyticsService.getCollageCreationStats(days).subscribe({
      next: (data: any) => {
        this.collageCreationData = data;
      },
      error: (error: any) => {
        console.error("שגיאה בטעינת נתוני קולאז'ים", error);
      }
    });

    this.analyticsService.getRecentActivities().subscribe({
      next: (data: any) => {
        this.recentActivities = data;
      },
      error: (error: any) => {
        console.error('שגיאה בטעינת פעילות אחרונה', error);
      }
    });
  }

  formatStorageSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onResize(event: any): void {
    this.view = [event.target.innerWidth / 1.35, 300];
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'login': return 'log-in';
      case 'upload': return 'upload';
      case 'delete': return 'trash';
      case 'collage': return 'image';
      default: return 'activity';
    }
  }
}


