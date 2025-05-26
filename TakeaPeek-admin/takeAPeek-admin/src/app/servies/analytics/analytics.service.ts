import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
// const API_BASE_URL = 'http://localhost:5293';

export class AnalyticsService  {

  constructor(private http:HttpClient) { }

  // סטטיסטיקה מהירה
  getSummaryStats(): Observable<any> {
    return forkJoin({
      users: this.http.get<any[]>(`${environment.apiUrl}/users`),
      files: this.http.get<any[]>(`${environment.apiUrl}/files`)


      // collages: this.http.get<any[]>('/collages')
    }).pipe(
      map(({ users, files }) => {
        const totalStorage = files.reduce((sum, file) => sum + file.size, 0);
        
        return {
          totalUsers: users.length,
          totalFiles: files.length,
          totalStorage: totalStorage,
          totalCollages: 0 // יש להחליף כשיהיה endpoint פעיל
        };
      })
    );
  }

  // סטטיסטיקת העלאות קבצים
  getFileUploadStats(days: number = 30): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/files`).pipe(
      map(files => {
        // סינון קבצים לפי תאריך
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        const filteredFiles = files.filter(file => {
          const fileDate = new Date(file.updatedAt);
          return fileDate >= cutoffDate;
        });
        
        // קיבוץ לפי תאריך
        const groupedByDate = this.groupFilesByDate(filteredFiles);
        
        // המרה למבנה הנדרש לגרף
        return [
          {
            name: 'העלאות קבצים',
            series: Object.entries(groupedByDate).map(([date, count]) => ({
              name: date,
              value: count
            }))
          }
        ];
      })
    );
  }

  // סטטיסטיקת שימוש באחסון
  getStorageUsageStats(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/files`).pipe(
      map(files => {
        // קיבוץ לפי סוג קובץ
        const groupedByType: Record<string, number> = {};
        
        files.forEach(file => {
          const fileType = this.getFileCategory(file.fileType);
          groupedByType[fileType] = (groupedByType[fileType] || 0) + file.size;
        });
        
        // המרה למבנה הנדרש לגרף
        return Object.entries(groupedByType).map(([type, size]) => ({
          name: type,
          value: size
        }));
      })
    );
  }

  // סטטיסטיקת פעילות משתמשים
  getUserActivityStats(days: number = 30): Observable<any[]> {
    // כאן צריך לוגיקה שתתבסס על לוגים או נתוני פעילות
    // לצורך הדוגמה, נחזיר נתונים מדומים
    
    return this.http.get<any[]>(`${environment.apiUrl}/users`);

  }

  // סטטיסטיקת יצירת קולאז'ים
  getCollageCreationStats(days: number = 30): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/files`).pipe(
      map(collages => {
        // סינון קולאז'ים לפי תאריך
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        const filteredCollages = collages.filter(collage => {
          const collageDate = new Date(collage.createdAt);
          return collageDate >= cutoffDate;
        });
        
        // קיבוץ לפי תאריך
        const groupedByDate = this.groupCollagesByDate(filteredCollages);
        
        // המרה למבנה הנדרש לגרף
        return Object.entries(groupedByDate).map(([date, count]) => ({
          name: date,
          value: count
        }));
      })
    );
  }


  // פעילות אחרונה
  getRecentActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/files`).pipe(
      map(files => {
        // סינון קבצים שהועלו לאחרונה
        console.log('Files from server:', files);
        const cutoffDate = new Date();
        cutoffDate.setHours(cutoffDate.getHours() - 1); // מציין העלאות בשעה האחרונה
  
        const recentUploads = files.filter(file => new Date(file.updatedAt) >= cutoffDate);
  
        // המרת הנתונים לפורמט של פעילויות
        return recentUploads.map(file => ({
          id: file.id,
          type: 'upload',
          userName: file.userName,
          description: `העלה קובץ בשם ${file.name}`,
          timestamp: new Date(file.updatedAt)
        }));
      })
    );
  }
  

  // פונקציות עזר
  private groupFilesByDate(files: any[]): Record<string, number> {
    const grouped:Record<string, number> = {};
    
    files.forEach(file => {
      const date = new Date(file.updatedAt);
      const dateStr = date.toISOString().split('T')[0];
      
      grouped[dateStr] = (grouped[dateStr] || 0) + 1;
    });
    
    return grouped;
  }

  private groupCollagesByDate(collages: any[]): Record<string, number> {
    const grouped :Record<string, number>= {};
    
    collages.forEach(collage => {
      const date = new Date(collage.createdAt);
      const dateStr = date.toISOString().split('T')[0];
      
      grouped[dateStr] = (grouped[dateStr] || 0) + 1;
    });
    
    return grouped;
  }

  private getFileCategory(mimeType: string): string {
    if (!mimeType) return 'אחר';
    
    if (mimeType.startsWith('image/')) return 'תמונות';
    if (mimeType.startsWith('video/')) return 'וידאו';
    if (mimeType.startsWith('audio/')) return 'אודיו';
    if (mimeType.includes('pdf')) return 'PDF';
    
    return 'אחר';
  }

  private generateDateSeries(days: number, min: number, max: number): any[] {
    const series = [];
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      series.push({
        name: dateStr,
        value: Math.floor(Math.random() * (max - min + 1)) + min
      });
    }
    
    return series;
  }
}
