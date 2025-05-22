using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TakeAPeek_server.Migrations
{
    /// <inheritdoc />
    public partial class folderANDfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Folders",
                newName: "OwnerId");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "Folders",
                newName: "ParentFolderId");

            migrationBuilder.RenameColumn(
                name: "Filename",
                table: "Files",
                newName: "FileName");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Files",
                newName: "OwnerId");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Files",
                newName: "S3Key");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Folders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<long>(
                name: "Size",
                table: "Files",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "FolderId",
                table: "Files",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "Files",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Files",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Folders");

            migrationBuilder.DropColumn(
                name: "FileType",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Files");

            migrationBuilder.RenameColumn(
                name: "ParentFolderId",
                table: "Folders",
                newName: "ParentId");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Folders",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "Files",
                newName: "Filename");

            migrationBuilder.RenameColumn(
                name: "S3Key",
                table: "Files",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Files",
                newName: "UserId");

            migrationBuilder.AlterColumn<int>(
                name: "Size",
                table: "Files",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "FolderId",
                table: "Files",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
