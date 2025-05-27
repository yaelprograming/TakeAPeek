import { useAuth as useAuthContext } from "../components/AuthContext"

// Hook נוח לקבלת פרטי המשתמש
export const useCurrentUser = () => {
  const { user, userId, isAuthenticated } = useAuthContext()

  return {
    user,
    userId,
    isAuthenticated,
    // פונקציה נוחה לקבלת headers עם authorization
    getAuthHeaders: () => {
      const token = localStorage.getItem("token")
      return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      }
    },
    // פונקציה לקבלת FormData עם OwnerId
    appendOwnerToFormData: (formData: FormData) => {
      if (userId) {
        formData.append("OwnerId", userId.toString())
      }
      return formData
    },
  }
}
