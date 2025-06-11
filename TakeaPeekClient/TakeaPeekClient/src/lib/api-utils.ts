import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const apiClient = {
  get: async (url: string) => {
    const token = localStorage.getItem("token")
    const response = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    })
    return response
  },

  // POST request עם authentication
  post: async (url: string, data: any) => {
    const token = localStorage.getItem("token")
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response
  },

  // Upload file עם authentication
  uploadFile: async (url: string, formData: FormData, userId: string | number) => {
    const token = localStorage.getItem("token")
    formData.append("OwnerId", userId.toString())

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    })
    return response
  },
}
