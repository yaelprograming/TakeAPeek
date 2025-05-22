namespace TakeAPeek_server.Entities
{
    public class Tag
    {
        public int Id { get; set; } // Corresponds to id INT PRIMARY KEY
        public string Name { get; set; } // Corresponds to name VARCHAR(50) UNIQUE, NOT NULL
    }

}
