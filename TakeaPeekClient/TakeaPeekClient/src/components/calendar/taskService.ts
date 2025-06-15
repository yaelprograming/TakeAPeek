import axiosInstance from "../../hooks/axsiosInstance"
import { Task } from "../../types/types"

const API_URL = axiosInstance.defaults.baseURL + "/events"

export const taskService = {
  async getTasks(): Promise<Task[]>{
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/user`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        // "Content-Type": "application/json",     
       }
    })
    if (!response.ok) {
      throw new Error("Failed to fetch tasks")
    }
    return response.json()
  },

  async getTask(id: string): Promise<Task> {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch task")
    }
    return response.json()
  },

  async createTask(task: Task): Promise<Task> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      throw new Error("Failed to create task")
    }
    return response.json()
  },

  async updateTask(task: Task): Promise<Task> {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      throw new Error("Failed to update task")
    }
    return response.json()
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete task")
    }
  },
}
