namespace TakeAPeek_server.Entities
{
    public class Folder
    {
        public int Id { get; set; } // מזהה ייחודי
        public string Name { get; set; } // שם התיקיה
        public int? ParentFolderId { get; set; } // תיקיית אב (null לתיקיית שורש)
        public int OwnerId { get; set; } // בעל התיקיה
        public DateTime CreatedAt { get; set; } // תאריך יצירה
        public DateTime UpdatedAt { get; set; } // תאריך עדכון אחרון
        public bool IsDeleted { get; set; } // דגל למחיקה רכה
    }
}
