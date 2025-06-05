using TakeAPeek_server.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace TakeAPeek_server.Controllers
    {
        public static class AIEndpoints
        {
        
        public static void MapAIEndpoints(WebApplication app)
        {
            app.MapGet("/analyze-all-images", async (IFileService fileService, IImageAnalysisService aiService) =>
            {
                var allFiles = await fileService.GetAllFiles();
                var results = new List<object>();

                foreach (var file in allFiles)
                {
                    try
                    {
                        using var stream = await fileService.DownloadFile(file.Id);
                        if (stream == null) continue;

                        using var ms = new MemoryStream();
                        await stream.CopyToAsync(ms);
                        var bytes = ms.ToArray();

                        var analysis = await aiService.AnalyzeImageAsync(bytes);

                        file.Category = analysis.Category;
                        file.IsBlurry = analysis.IsBlurry;
                        file.PeopleCount = analysis.PeopleCount;
                        file.IsOutdoor = analysis.IsOutdoor;
                        file.EyesClosed = analysis.HasClosedEyes;
                        file.AnalysisCompletedIs = true;

                        await fileService.UpdateFile(file);

                        results.Add(new
                        {
                            FileId = file.Id,
                            FileName = file.FileName,
                            Analysis = analysis
                        });
                    }
                    catch (Exception ex)
                    {
                        results.Add(new
                        {
                            FileId = file.Id,
                            FileName = file.FileName,
                            Error = ex.Message
                        });
                    }
                }

                return Results.Ok(results);
            });
        }

    }

    //public class BatchAnalysisRequest
    //{
    //    public List<string> ImageIds { get; set; } = new List<string>();
    //    public List<string> AnalysisTypes { get; set; } = new List<string>();
    //}
}



