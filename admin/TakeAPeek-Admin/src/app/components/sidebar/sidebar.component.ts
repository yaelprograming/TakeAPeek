import { Component, Input,  OnInit } from "@angular/core"
import  { Router } from "@angular/router"
import  { AuthService } from "../../services/auth.service"

interface MenuItem {
  title: string
  icon: string
  route: string
  active: boolean
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false

  menuItems: MenuItem[] = [
    { title: "Analytics", icon: "bar-chart", route: "/dashboard/analytics", active: false },
    { title: "Users", icon: "users", route: "/dashboard/users", active: false },
    { title: "Settings", icon: "settings", route: "/dashboard/settings", active: false },
  ]

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.setActiveMenuItem()
  }

  setActiveMenuItem(): void {
    const currentUrl = this.router.url
    this.menuItems.forEach((item) => {
      item.active = currentUrl.includes(item.route)
    })
  }

  navigateTo(route: string): void {
    this.router.navigate([route])
    this.setActiveMenuItem()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
