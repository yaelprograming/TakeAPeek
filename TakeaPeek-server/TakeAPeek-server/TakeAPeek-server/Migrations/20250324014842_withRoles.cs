using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TakeAPeek_server.Migrations
{
    /// <inheritdoc />    {
        public partial class withRoles : Migration
        {
            protected override void Up(MigrationBuilder migrationBuilder)
            {
                // יצירת טבלת Roles
                migrationBuilder.CreateTable(
                    name: "Roles",
                    columns: table => new
                    {
                        Id = table.Column<int>(type: "int", nullable: false)
                            .Annotation("SqlServer:Identity", "1, 1"), // תכונה של מזהה ייחודי
                        RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false) // שם התפקיד
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_Roles", x => x.Id); // מפתח ראשי
                    });

                // במקרה של צורך להוסיף טבלת קשר בין משתמשים לתפקידים (אם זה לא קיים)
                migrationBuilder.CreateTable(
                    name: "UserRoles",
                    columns: table => new
                    {
                        UserId = table.Column<int>(type: "int", nullable: false),
                        RoleId = table.Column<int>(type: "int", nullable: false)
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                        table.ForeignKey(
                            name: "FK_UserRoles_Users_UserId",
                            column: x => x.UserId,
                            principalTable: "Users",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade);
                        table.ForeignKey(
                            name: "FK_UserRoles_Roles_RoleId",
                            column: x => x.RoleId,
                            principalTable: "Roles",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade);
                    });
            }

            protected override void Down(MigrationBuilder migrationBuilder)
            {
                // מחיקת טבלת UserRoles אם היא קיימת
                migrationBuilder.DropTable(
                    name: "UserRoles");

                // מחיקת טבלת Roles
                migrationBuilder.DropTable(
                    name: "Roles");
            }
        }
    }


