import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import {  Observable, of } from "rxjs"
import  { User } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class UserService {
  // Mock data for demo purposes
  private users: User[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "admin",
      isActive: true,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      role: "editor",
      isActive: true,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.johnson@example.com",
      role: "user",
      isActive: false,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Williams",
      email: "emily.williams@example.com",
      role: "user",
      isActive: true,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      firstName: "David",
      lastName: "Brown",
      email: "david.brown@example.com",
      role: "editor",
      isActive: true,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ]

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // In a real application, this would make an HTTP request to your API
    // For demo purposes, we'll return the mock data
    return of(this.users)
  }

  getUserById(id: number): Observable<User | undefined> {
    const user = this.users.find((u) => u.id === id)
    return of(user)
  }

  createUser(user: User): Observable<User> {
    // Generate a new ID
    const newId = Math.max(...this.users.map((u) => u.id)) + 1
    const newUser = { ...user, id: newId }

    // Add to mock data
    this.users.push(newUser)

    return of(newUser)
  }

  updateUser(user: User): Observable<User> {
    // Find and update the user in mock data
    const index = this.users.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      this.users[index] = { ...user }
    }

    return of(user)
  }

  deleteUser(id: number): Observable<boolean> {
    // Remove the user from mock data
    const initialLength = this.users.length
    this.users = this.users.filter((u) => u.id !== id)

    return of(this.users.length < initialLength)
  }
}
