using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TakeAPeek_server.Migrations
{
    /// <inheritdoc />
    public partial class AddRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleName", "Description", "CreatedAt", "UpdatedAt" },
                values: new object[,]
                {
            { "Admin", "Administrator role with full access", DateTime.Now, DateTime.Now },
            { "Editor", "Editor role with permissions to edit content", DateTime.Now, DateTime.Now },
            { "Viewer", "Viewer role with permissions to view content", DateTime.Now, DateTime.Now }
                });
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
