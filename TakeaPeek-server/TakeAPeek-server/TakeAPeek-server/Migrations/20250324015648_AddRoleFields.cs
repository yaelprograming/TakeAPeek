using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TakeAPeek_server.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
              name: "Description",
              table: "Roles",
              type: "nvarchar(max)",
              nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Roles",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Roles",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Description", table: "Roles");
            migrationBuilder.DropColumn(name: "CreatedAt", table: "Roles");
            migrationBuilder.DropColumn(name: "UpdatedAt", table: "Roles");
        }
    }
}
