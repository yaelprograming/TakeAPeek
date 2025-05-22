import { Component, type OnInit } from "@angular/core"
import { AnalyticsService } from "../../services/analytics.service"

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {
  isLoading = true

  // Chart data
  userActivityData: any[] = []
  photoUploadsData: any[] = []
  storageUsageData: any[] = []

  // Chart options
  view: [number, number] = [700, 300]
  showXAxis = true
  showYAxis = true
  gradient = false
  showLegend = true
  showXAxisLabel = true
  showYAxisLabel = true

  // User activity chart
  userActivityXAxisLabel = "Date"
  userActivityYAxisLabel = "Users"

  // Photo uploads chart
  photoUploadsXAxisLabel = "Date"
  photoUploadsYAxisLabel = "Uploads"

  // Storage usage chart
  storageUsageXAxisLabel = "Storage Type"
  storageUsageYAxisLabel = "Usage (GB)"

  colorScheme = {
    domain: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"],
  }

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalyticsData()
  }

  loadAnalyticsData(): void {
    this.isLoading = true

    this.analyticsService.getUserActivityData().subscribe({
      next: (data) => {
        this.userActivityData = data
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error loading user activity data", error)
        this.isLoading = false
      },
    })

    this.analyticsService.getPhotoUploadsData().subscribe({
      next: (data) => {
        this.photoUploadsData = data
      },
      error: (error) => {
        console.error("Error loading photo uploads data", error)
      },
    })

    this.analyticsService.getStorageUsageData().subscribe({
      next: (data) => {
        this.storageUsageData = data
      },
      error: (error) => {
        console.error("Error loading storage usage data", error)
      },
    })
  }

  onResize(event: any): void {
    this.view = [event.target.innerWidth / 1.35, 300]
  }
}
