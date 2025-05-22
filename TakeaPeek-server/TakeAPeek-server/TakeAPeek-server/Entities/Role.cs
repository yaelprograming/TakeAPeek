namespace TakeAPeek_server.Entities
{
    public class Role
    {
        public int Id { get; set; } // מזהה ייחודי
        public string RoleName { get; set; } // שם התפקיד
        public string Description { get; set; } // תיאור התפקיד
        public DateTime CreatedAt { get; set; } // תאריך יצירת התפקיד
        public DateTime UpdatedAt { get; set; } // תאריך עדכון אחרון

    }

}
