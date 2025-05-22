namespace TakeAPeek_server.Entities
{
    public class RolePermission
    {
        public int Id { get; set; }
        public int RoleId { get; set; } // מזהה התפקיד (FK to Roles)
        public int PermissionId { get; set; } // מזהה ההרשאה (FK to Permissions)

        //gpt
        //public Role Role { get; set; } // קשר לתפקיד
        //public Permission Permission { get; set; } // קשר להרשאה
    }

}
