namespace TakeAPeek_server.Entities
{
    public class Permission
    {
        public int Id { get; set; } // מזהה ייחודי
        public string PermissionName { get; set; } // שם ההרשאה
        public string Description { get; set; } // תיאור ההרשאה

        //gpt
        //public ICollection<RolePermission> RolePermissions { get; set; } // קשר עם טבלת RolePermissions
    }
}
