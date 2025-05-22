import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import {  Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getUserActivityData(): Observable<any[]> {
    // Mock data for user activity chart
    const mockData = [
      {
        name: "Active Users",
        series: [
          { name: "2023-01-01", value: 420 },
          { name: "2023-01-08", value: 380 },
          { name: "2023-01-15", value: 520 },
          { name: "2023-01-22", value: 580 },
          { name: "2023-01-29", value: 620 },
          { name: "2023-02-05", value: 750 },
          { name: "2023-02-12", value: 680 },
        ],
      },
      {
        name: "New Users",
        series: [
          { name: "2023-01-01", value: 120 },
          { name: "2023-01-08", value: 90 },
          { name: "2023-01-15", value: 150 },
          { name: "2023-01-22", value: 180 },
          { name: "2023-01-29", value: 140 },
          { name: "2023-02-05", value: 200 },
          { name: "2023-02-12", value: 170 },
        ],
      },
    ]

    return of(mockData)
  }

  getPhotoUploadsData(): Observable<any[]> {
    // Mock data for photo uploads chart
    const mockData = [
      { name: "Jan 1-7", value: 1250 },
      { name: "Jan 8-14", value: 1450 },
      { name: "Jan 15-21", value: 1800 },
      { name: "Jan 22-28", value: 2100 },
      { name: "Jan 29-Feb 4", value: 1950 },
      { name: "Feb 5-11", value: 2300 },
      { name: "Feb 12-18", value: 2150 },
    ]

    return of(mockData)
  }

  getStorageUsageData(): Observable<any[]> {
    // Mock data for storage usage chart
    const mockData = [
      { name: "Photos", value: 350 },
      { name: "Videos", value: 120 },
      { name: "Raw Files", value: 80 },
      { name: "Other", value: 40 },
    ]

    return of(mockData)
  }
}
