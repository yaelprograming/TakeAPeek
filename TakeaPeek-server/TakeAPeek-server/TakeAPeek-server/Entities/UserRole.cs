namespace TakeAPeek_server.Entities
{
    public class UserRole
    {
        public int Id { get; set; }
        public int UserId { get; set; } // מזהה המשתמש (FK to Users)
        public int RoleId { get; set; } // מזהה התפקיד (FK to Roles)
        
        //gpt
        public User User { get; set; } // הקשר למשתמש
        public Role Role { get; set; } // הקשר לתפקיד
    }

}
