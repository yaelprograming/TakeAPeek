export interface User {
    isActive: any;
    id: number; // Corresponds to id INT PRIMARY KEY AUTO_INCREMENT
    name: string; // Corresponds to name VARCHAR(50) NOT NULL
    email: string; // Corresponds to email VARCHAR(100) UNIQUE NOT NULL
    password: string; // Corresponds to password VARCHAR(255) NOT NULL
    createdAt: Date; // Corresponds to created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    updatedAt: Date; // Corresponds to updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     role:string; // Corresponds to role ENUM('user', 'admin') DEFAULT 'user'
    }
