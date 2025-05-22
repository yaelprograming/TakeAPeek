namespace TakeAPeek_server.Entities
{
    public class User
    {
        public int Id { get; set; } // Corresponds to id INT PRIMARY KEY AUTO_INCREMENT
        public string Name { get; set; } // Corresponds to name VARCHAR(50) NOT NULL
        public string Email { get; set; } // Corresponds to email VARCHAR(100) UNIQUE NOT NULL
        public string Password { get; set; } // Corresponds to password VARCHAR(255) NOT NULL
        public DateTime CreatedAt { get; set; } // Corresponds to created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        public DateTime UpdatedAt { get; set; } // Corresponds to updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        public string Role { get; set; } // Corresponds to role ENUM('user', 'admin') DEFAULT 'user'
    }
}
