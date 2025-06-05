using TakeAPeek_server.Services.IServices;
using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;
using File = TakeAPeek_server.Entities.File;
using TakeAPeek_server.Services.CServices;
using Microsoft.Extensions.DependencyInjection;
using TakeAPeek_server.Services.CServices.TakeAPeek_server.Services;
using Microsoft.AspNetCore.Http;
using System.IO.Compression;

namespace TakeAPeek_server.Controllers
{
    public static class FileEndpoints
    {
        public static void MapFileEndpoints(WebApplication app)
        {
            app.MapGet("/files", async (IFileService fileService) => await fileService.GetAllFiles());

            app.MapGet("/files/{id}", async (int id, IFileService fileService) => await fileService.GetFile(id))
            ;

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
            //   .RequireAuthorization( "Editor", "Admin" ); 


            app.MapDelete("/files/{id}", async (int id, IFileService fileService) => await fileService.DeleteFile(id));
            //.RequireAuthorization( "Editor", "Admin"); 

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
            //  .RequireAuthorization(); ;

            //app.MapGet("/files/{id}/download", async (int id, IFileService fileService) =>
            //{
            //    try
            //    {
            //        var file = await fileService.GetFile(id); // מחזיר את ה-File עם כל המידע
            //        if (file == null || file.IsDeleted)
            //            return Results.NotFound("File not found");

            //        var fileStream = await fileService.DownloadFile(id);
            //        if (fileStream == null)
            //            return Results.NotFound("File content not found");

            //        // שימוש ב-FileType כדי לקבוע את Content-Type
            //        var contentType = string.IsNullOrEmpty(file.FileType) ? "application/octet-stream" : file.FileType;
            //        var fileName = string.IsNullOrEmpty(file.FileName) ? "downloaded-file" : file.FileName;

            //        return Results.File(
            //            fileStream,
            //            contentType,
            //            fileName,
            //            enableRangeProcessing: false
            //        );
            //    }
            //    catch (Exception ex)
            //    {
            //        return Results.Problem(ex.Message);
            //    }
            //});




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

            //    app.MapPost("/files", async (
            //IFileService fileService,
            //HttpContext httpContext,
            //[FromForm] IFormFileCollection files,
            //[FromForm] string FolderId,
            //[FromForm] string OwnerId
            //) =>
            //    {
            //        try
            //        {
            //            // נוודא שהקלטים תקינים
            //            if (!int.TryParse(OwnerId, out var ownerId))
            //                return Results.BadRequest("Invalid OwnerId");

            //            int? folderId = null;
            //            if (!string.IsNullOrWhiteSpace(FolderId) && int.TryParse(FolderId, out var parsedFolderId))
            //                folderId = parsedFolderId;

            //            if (files == null || files.Count == 0)
            //                return Results.BadRequest("No files uploaded.");

            //            foreach (var file in files)
            //            {
            //                if (file.Length > 10 * 1024 * 1024)
            //                    return Results.BadRequest($"The file {file.FileName} size exceeds the maximum limit of 10MB.");

            //                var newFile = new TakeAPeek_server.Entities.File
            //                {
            //                    FileName = file.FileName,
            //                    FileType = file.ContentType,
            //                    FolderId = folderId,
            //                    Size = file.Length,
            //                    OwnerId = ownerId,
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

            app.MapPost("/files", async (
         IFileService fileService,
         IImageAnalysisService imageAnalysisService,
         DataContext db,
         HttpContext httpContext,
         [FromForm] IFormFileCollection files,
         [FromForm] string FolderId,
         [FromForm] string OwnerId,
         IServiceProvider serviceProvider
     ) =>
            {
                if (!int.TryParse(OwnerId, out var ownerId))
                    return Results.BadRequest("Invalid OwnerId");

                int? folderId = null;
                if (!string.IsNullOrWhiteSpace(FolderId) && int.TryParse(FolderId, out var parsedFolderId))
                    folderId = parsedFolderId;

                fileService.UploadTest();
                if (files == null || files.Count == 0)
                    return Results.BadRequest("No files uploaded.");

                var uploadedFiles = new List<File>();

                foreach (var file in files)
                {
                    if (file.Length > 10 * 1024 * 1024)
                        return Results.BadRequest($"The file {file.FileName} size exceeds the limit.");

                    var newFile = new TakeAPeek_server.Entities.File
                    {
                        FileName = file.FileName,
                        FileType = file.ContentType,
                        FolderId = folderId,
                        Size = file.Length,
                        OwnerId = ownerId,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow,
                        IsDeleted = false,
                        AnalysisCompletedIs = false
                    };

                    if (!file.ContentType.StartsWith("image/"))
                        return Results.BadRequest($"Unsupported file type: {file.ContentType}");

                    using var stream = file.OpenReadStream();
                    var createdFile = await fileService.UploadFileToS3(newFile, stream);
                    uploadedFiles.Add(createdFile);

                    // ✨ הרצת הניתוח ברקע
                    Console.WriteLine("Calling AnalyzeImage...");
                    //_ = Task.Run(async () =>
                    //{
                    //    Console.WriteLine("Calling AnalyzeImage in the task...");
                    //    var results = new Object();

                    //    using var scope = serviceProvider.CreateScope();
                    //    var scopedDb = scope.ServiceProvider.GetRequiredService<DataContext>();
                    //    try
                    //    {
                    //        // הורדה מחדש מה-S3 (או שמור לניתוח מיידי מה-stream)

                    //        using var stream = await fileService.DownloadFile(createdFile.Id);

                    //        using var ms = new MemoryStream();
                    //        await stream.CopyToAsync(ms);
                    //        var bytes = ms.ToArray();

                    //        var analysis = await imageAnalysisService.AnalyzeImageAsync(bytes,createdFile.FileType);

                    //       createdFile.Category = analysis.Category;
                    //       createdFile.IsBlurry = analysis.IsBlurry;
                    //       createdFile.PeopleCount = analysis.PeopleCount;
                    //       createdFile.IsOutdoor = analysis.IsOutdoor;
                    //       createdFile.EyesClosed = analysis.HasClosedEyes;
                    //       createdFile.AnalysisCompletedIs = true;

                    //        await fileService.UpdateFile(createdFile);

                    //        results=(new
                    //        {
                    //            FileId = createdFile.Id,
                    //            FileName = createdFile.FileName,
                    //            Analysis = analysis
                    //        });

                    //    }
                    //    catch (Exception ex)
                    //    {
                    //        Console.WriteLine($"⚠ analysis filed : {ex.Message}");
                    //        results=(new
                    //        {
                    //            FileId = createdFile.Id,
                    //            FileName = createdFile.FileName,
                    //            Error = ex.Message
                    //        });
                    //    }

                    //    return Results.Ok(results);
                    //});

                    _ = Task.Run(async () =>
                    {
                        using var scope = serviceProvider.CreateScope(); // ⬅️ זה יוצר scope חדש
                        var scopedDb = scope.ServiceProvider.GetRequiredService<DataContext>();

                        try
                        {
                            using var stream = await fileService.DownloadFile(createdFile.Id);

                            using var ms = new MemoryStream();
                            await stream.CopyToAsync(ms);
                            var bytes = ms.ToArray();

                            var analysis = await imageAnalysisService.AnalyzeImageAsync(bytes);

                            createdFile.Category = analysis.Category;
                            createdFile.IsBlurry = analysis.IsBlurry;
                            createdFile.PeopleCount = analysis.PeopleCount;
                            createdFile.IsOutdoor = analysis.IsOutdoor;
                            createdFile.EyesClosed = analysis.HasClosedEyes;
                            createdFile.AnalysisCompletedIs = true;

                            // ⬇️ שמור דרך ה־DbContext החדש
                            scopedDb.Files.Update(createdFile);
                            await scopedDb.SaveChangesAsync();
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"⚠ analysis failed: {ex.Message}");
                        }
                    });

                }

                return Results.Ok(new
                {
                    message = "העלאה בוצעה בהצלחה. הניתוח יתבצע ברקע.",
                    uploaded = uploadedFiles.Select(f => new { f.Id, f.FileName }),
                });
            });
               // .DisableAntiforgery().RequireAuthorization("Editor", "Admin");

            app.MapPost("/api/files/filter", async (
                [FromBody] FilterRequest request,
                IFileService fileService) =>
            {
                try
                {
                    var allFiles = await fileService.GetFilesByFolderId(request.FolderId);

                    var filteredFiles = allFiles.Where(file =>
                        (!request.HideBlurry || file.IsBlurry != true) &&
                        (!request.HideClosedEyes || file.EyesClosed != true) &&
                        (request.PeopleCount == null || file.PeopleCount == request.PeopleCount) &&
                        (request.IsOutdoor == null || file.IsOutdoor == request.IsOutdoor) &&
                        (string.IsNullOrEmpty(request.Category) || file.Category == request.Category) &&
                        (string.IsNullOrEmpty(request.SearchTerm) || file.FileName.Contains(request.SearchTerm, StringComparison.OrdinalIgnoreCase))
                    ).ToList();

                    return Results.Ok(filteredFiles);
                }
                catch (Exception ex)
                {
                    return Results.Problem($"Internal server error: {ex.Message}", statusCode: 500);
                }
            });


            app.MapPost("/api/files/download-filtered", async (
                [FromBody] DownloadRequest request,
                IFileService fileService) =>
            {
                try
                {
                    if (request.FileIds == null || !request.FileIds.Any())
                        return Results.BadRequest("No files specified for download");

                    using var memoryStream = new MemoryStream();
                    using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                    {
                        foreach (var fileId in request.FileIds)
                        {
                            var file = await fileService.GetFile(int.Parse(fileId));
                            if (file == null || file.IsDeleted)
                                continue;

                            var fileContent = await fileService.GetFileContent(file.Id);
                            if (fileContent == null)
                                continue;

                            var entry = archive.CreateEntry(file.FileName);
                            using var entryStream = entry.Open();
                            await entryStream.WriteAsync(fileContent, 0, fileContent.Length);
                        }
                    }

                    memoryStream.Seek(0, SeekOrigin.Begin);
                    return Results.File(memoryStream.ToArray(), "application/zip", "filtered-images.zip");
                }
                catch (Exception ex)
                {
                    return Results.Problem($"Internal server error: {ex.Message}", statusCode: 500);
                }
            });


        }
    }

    }



