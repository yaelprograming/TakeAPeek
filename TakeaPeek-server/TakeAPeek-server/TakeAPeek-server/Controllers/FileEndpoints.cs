using TakeAPeek_server.Services.IServices;
using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;


namespace TakeAPeek_server.Controllers
{
    public static class FileEndpoints
    {
        public static void MapFileEndpoints(WebApplication app)
        {
            app.MapGet("/files", async (IFileService fileService) => await fileService.GetAllFiles());
            // .RequireAuthorization(); ;

            app.MapGet("/files/{id}", async (int id, IFileService fileService) => await fileService.GetFile(id));
            //.RequireAuthorization(); ;

            // app.MapPost("/files", async (TakeAPeek_server.Entities.File file, IFileService fileService) => await fileService.CreateFile(file));
            // .RequireAuthorization("Editor", "Admin"); ;

            app.MapPut("/files/{id}", async (int id, TakeAPeek_server.Entities.File file, IFileService fileService) =>
            {
                var existingFile = await fileService.GetFile(id);
                if (existingFile == null)
                    return Results.NotFound("File not found");

                existingFile.FileName = file.FileName;
                existingFile.UpdatedAt = DateTime.UtcNow;

                var updatedFile = await fileService.UpdateFile(existingFile);
                return Results.Ok(updatedFile);
            });
            //.RequireAuthorization( "Editor", "Admin" ); ;


            app.MapDelete("/files/{id}", async (int id, IFileService fileService) => await fileService.DeleteFile(id));//.RequireAuthorization( "Editor", "Admin"); ;

            app.MapGet("/files/{id}/download", async (int id, IFileService fileService) =>
            {
                try
                {
                    var fileStream = await fileService.DownloadFile(id);
                    if (fileStream == null)
                    {
                        return Results.NotFound("File not found");
                    }

                    // החזרת הקובץ ללקוח (עם סוג MIME שמזוהה לפי הסיומת)
                    return Results.File(fileStream, "application/octet-stream", "downloadedFile");
                }
                catch (Exception ex)
                {
                    return Results.NotFound(ex.Message);
                }
            });

            //    app.MapPost("/files", async (IFileService fileService, HttpContext httpContext, [FromForm] IFormFileCollection files,[FromForm] string FolderId, [FromForm] string OwnerId) =>

            //    //app.MapPost("/files", async (IFileService fileService, HttpContext httpContext) =>
            //    {
            //        try
            //        {
            //            var form = await httpContext.Request.ReadFormAsync();
            //            // var folderId = form["FolderId"].ToString();
            //            //var folderId = form["folderId"];
            //            //var ownerId = form["OwnerId"];
            //            //.ToString();

            //           var ownerId = int.TryParse(form["OwnerId"], out int owner) ? owner : throw new FormatException("Invalid OwnerId");

            //          var  folderId = int.TryParse(form["FolderId"], out var folder) ? folder: (int?)null;


            //            if (files == null || files.Count == 0)
            //                return Results.BadRequest("No files uploaded.");

            //            foreach (var file in files)
            //            {
            //                if (file.Length > 10 * 1024 * 1024)
            //                    return Results.BadRequest($"The file {file.FileName} size exceeds the maximum limit of 10MB.");
            //                Console.WriteLine("folderId=======: "+folderId);
            //                var newFile = new TakeAPeek_server.Entities.File
            //                {
            //                    FileName = file.FileName,
            //                    FileType = file.ContentType,
            //                    FolderId = int.TryParse(folderId, out var parsedFolderId) ? parsedFolderId : (int?)null,
            //                    Size = file.Length,
            //                    OwnerId = int.TryParse(ownerId, out var parsedOwnerId) ? parsedOwnerId : 0,
            //                    UpdatedAt = DateTime.UtcNow,
            //                    IsDeleted = false,
            //                };

            //                using var fileStream = file.OpenReadStream();
            //                var createdFile = await fileService.UploadFileToS3(newFile, fileStream);
            //            }

            //            return Results.Created($"/files", "Files uploaded successfully.");
            //        }
            //        catch (Exception ex)
            //        {
            //            return Results.BadRequest(ex.Message);
            //        }
            //    }).DisableAntiforgery();

            //    app.MapGet("/files/generate-url", async (string s3Key, IFileService fileService) =>
            //    {
            //        return await Task.FromResult(fileService.GetPresignedUrl(s3Key));
            //    });
            app.MapPost("/files", async (
        IFileService fileService,
        HttpContext httpContext,
        [FromForm] IFormFileCollection files,
        [FromForm] string FolderId,
        [FromForm] string OwnerId) =>
            {
                try
                {
                    // נוודא שהקלטים תקינים
                    if (!int.TryParse(OwnerId, out var ownerId))
                        return Results.BadRequest("Invalid OwnerId");

                    int? folderId = null;
                    if (!string.IsNullOrWhiteSpace(FolderId) && int.TryParse(FolderId, out var parsedFolderId))
                        folderId = parsedFolderId;

                    if (files == null || files.Count == 0)
                        return Results.BadRequest("No files uploaded.");

                    foreach (var file in files)
                    {
                        if (file.Length > 10 * 1024 * 1024)
                            return Results.BadRequest($"The file {file.FileName} size exceeds the maximum limit of 10MB.");

                        var newFile = new TakeAPeek_server.Entities.File
                        {
                            FileName = file.FileName,
                            FileType = file.ContentType,
                            FolderId = folderId,
                            Size = file.Length,
                            OwnerId = ownerId,
                            UpdatedAt = DateTime.UtcNow,
                            IsDeleted = false,
                        };

                        using var fileStream = file.OpenReadStream();
                        var createdFile = await fileService.UploadFileToS3(newFile, fileStream);
                    }

                    return Results.Created($"/files", "Files uploaded successfully.");
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            }).DisableAntiforgery();

        }

    }
}

