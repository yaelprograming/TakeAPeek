namespace TakeAPeek_server.Entities
{
    public class Collage
    {
        public int Id { get; set; } // Corresponds to id INT PRIMARY KEY
        public int UserId { get; set; } // Corresponds to user_id INT FOREIGN KEY → Users(id)
        public string Template { get; set; } // Corresponds to template VARCHAR(100) NOT NULL
        public DateTime CreatedAt { get; set; } = DateTime.Now; // Corresponds to created_at DATETIME DEFAULT NOW()
    }
}
