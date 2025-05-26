// export interface User {
//     isActive: any;
//     id: number; // Corresponds to id INT PRIMARY KEY AUTO_INCREMENT
//     name: string; // Corresponds to name VARCHAR(50) NOT NULL
//     email: string; // Corresponds to email VARCHAR(100) UNIQUE NOT NULL
//     password: string; // Corresponds to password VARCHAR(255) NOT NULL
//     createdAt: Date; // Corresponds to created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     updatedAt: Date; // Corresponds to updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//      role:string; // Corresponds to role ENUM('user', 'admin') DEFAULT 'user'
//     }

    export interface User {
        id: number
        name: string
        email: string
        password?: string
        createdAt: Date
        updatedAt: Date
        role: string
        avatar?: string
        isActive: boolean
        lastLogin?: Date
        phoneNumber?: string
        department?: string
        totalPhotos?: number
        storageUsed?: number
      }
      
      export interface LoginModel {
        email: string
        password: string
      }
      
      export interface CreateUserModel {
        name: string
        email: string
        password: string
        roleName: string
        phoneNumber?: string
        department?: string
      }
      
      export interface UpdateUserModel {
        name: string
        email: string
        roleName: string
        phoneNumber?: string
        department?: string
        isActive: boolean
      }
      
      export interface AuthResponse {
        token: string
        user?: User
      }
      
      export interface UserStats {
        totalUsers: number
        activeUsers: number
        newUsersThisMonth: number
        adminCount: number
        editorCount: number
        viewerCount: number
      }
