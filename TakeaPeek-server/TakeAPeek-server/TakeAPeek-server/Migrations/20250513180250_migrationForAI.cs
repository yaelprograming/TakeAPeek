using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TakeAPeek_server.Migrations
{
    /// <inheritdoc />
    public partial class migrationForAI : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AnalysisCompletedIs",
                table: "Files",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Files",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EyesClosed",
                table: "Files",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsBlurry",
                table: "Files",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOutdoor",
                table: "Files",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PeopleCount",
                table: "Files",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnalysisCompletedIs",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "EyesClosed",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "IsBlurry",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "IsOutdoor",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "PeopleCount",
                table: "Files");
        }
    }
}
