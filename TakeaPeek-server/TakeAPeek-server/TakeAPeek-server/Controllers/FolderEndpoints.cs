namespace TakeAPeek_server.Controllers
{
    using Microsoft.AspNetCore.Builder;
    using NLog;
    using System.IO.Compression;
    using TakeAPeek_server.Entities;
    using TakeAPeek_server.Services.IServices;


    public static class FolderEndpoints
    {
        public static void MapFolderEndpoints(WebApplication app)
        {
            var logger = LogManager.GetCurrentClassLogger();
            LogManager.LoadConfiguration("NLog.config");

            app.MapGet("/folders", async (IFolderService folderService) => 
            await folderService.GetAllFolders());//.RequireAuthorization();

            app.MapGet("/folders/{id}", async (int id, IFolderService folderService) =>
            await folderService.GetFolder(id));//.RequireAuthorization();

            app.MapPost("/upload-folder", async (HttpRequest request, IS3Service s3Service) =>
            {
                var files = request.Form.Files;

                if (files.Count == 0)
                    return Results.BadRequest("No files uploaded.");

                foreach (var file in files)
                {
                    using var stream = file.OpenReadStream();
                    var key = file.FileName; // כולל נתיב יחסי מהתיקיה
                    await s3Service.UploadFileAsync(stream, key);
                }

                return Results.Ok("Folder uploaded successfully.");
            })
   .Accepts<IFormFileCollection>("multipart/form-data");

            app.MapPost("/folders", async (Folder folder, IFolderService folderService) => await folderService.CreateFolder(folder));//.RequireAuthorization("Editor", "Admin");



            //.RequireAuthorization("Editor", "Admin");

            app.MapPut("/folders/{id}", async (int id, Folder folder, IFolderService folderService) =>
            {
                var existingFolder = await folderService.GetFolder(id);
                if (existingFolder == null)
                    return Results.NotFound("Folder not found");

                existingFolder.Name = folder.Name;
                existingFolder.UpdatedAt = DateTime.UtcNow;

                var updatedFolder = await folderService.UpdateFolder(existingFolder);
                return Results.Ok(updatedFolder);
            });//.RequireAuthorization("Editor", "Admin");

            app.MapDelete("/folders/{id}", async (int id, IFolderService folderService) => await folderService.DeleteFolder(id));//.RequireAuthorization("Editor", "Admin");

            //תקיה עם כל התוכן שבתוכה

            app.MapGet("/folders/{id?}/contents", async (int? id, IFolderService folderService, IFileService fileService) =>
            {
                int folderId = id ?? 0; // אם אין ID, חפש בתיקיית השורש (נניח שזה 0)

                var folder = folderId == 0 ? null : await folderService.GetFolder(folderId);
                if (folderId != 0 && folder == null) return Results.NotFound("Folder not found");

                // כאן אתה שולף את התיקיות והקבצים תחת התיקיה הנוכחית
                //var current = await folderService.GetParentFolderAsync(folderId);
                var subFolders = await folderService.GetFoldersByParentId(folderId); // שלוף את התיקיות תחת התיקיה הנוכחית
                var files = await fileService.GetFilesByFolderId(folderId); // שלוף את הקבצים תחת התיקיה הנוכחית

                return Results.Ok(new { folders = subFolders, files = files });
            });

            //שליפה לפי האבא
            app.MapGet("/folders/{id}/parent", async (int id, IFolderService folderService) =>
            {
                var parentFolder = await folderService.GetParentFolderAsync(id);
                return parentFolder != null ? Results.Ok(parentFolder) : Results.NotFound();
            });

            //כל הענף
            app.MapGet("/folders/{id?}/breadcrumb", async (int id, IFolderService folderService) =>
            {
                var breadcrumb = await folderService.GetBreadcrumb(id); // קריאה לפונקציה ב-IFolderService
                return breadcrumb != null ? Results.Ok(breadcrumb) : Results.NotFound();
            });

            app.MapGet("/folders/{id}/download", async (int id, IFolderService folderService, IFileService fileService) =>
            {
                var folder = await folderService.GetFolder(id);
                if (folder == null) return Results.NotFound("Folder not found");

                var allFiles = await folderService.GetAllFilesInFolder(id, folder.Name);

                using var memoryStream = new MemoryStream();
                using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                {
                    foreach (var (relativePath, file) in allFiles)
                    {
                        var entry = archive.CreateEntry(relativePath);
                        using var entryStream = entry.Open();

                        var fileContent = await fileService.GetFileContent(file.Id);
                        if (fileContent != null)
                        {
                            await entryStream.WriteAsync(fileContent, 0, fileContent.Length);
                        }
                    }
                }
                memoryStream.Seek(0, SeekOrigin.Begin);
                return Results.File(memoryStream.ToArray(), "application/zip", $"{folder.Name}.zip");
            });

        }
    }
}
