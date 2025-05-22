import { Component,  OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { HeaderComponent } from "../header/header.component"
import { SidebarComponent } from "../sidebar/sidebar.component"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  // standalone: true,
  // imports: [
  //   RouterOutlet,
  //   SidebarComponent,
  //   HeaderComponent
  // ]
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed
  }

}
