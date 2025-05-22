using TakeAPeek_server.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace TakeAPeek_server.Controllers
    {
        public static class AIEndpoints
        {
        //    public static void MapAIEndpoints(WebApplication app)
        //    {
        //        // Endpoint for blur detection
        //        app.MapPost("/ai/detect-blur", async (HttpContext context, [FromServices] IAIService aiService) =>
        //        {
        //            try
        //            {
        //                var form = await context.Request.ReadFormAsync();
        //                var file = form.Files.FirstOrDefault();

        //                if (file == null)
        //                    return Results.BadRequest("No image file provided");

        //                using var stream = file.OpenReadStream();
        //                var result = await aiService.DetectBlur(stream);

        //                return Results.Ok(new { isBlurry = result.IsBlurry, blurScore = result.BlurScore });
        //            }
        //            catch (Exception ex)
        //            {
        //                return Results.BadRequest($"Error analyzing image: {ex.Message}");
        //            }
        //        });

        //        // Endpoint for face detection
        //        app.MapPost("/ai/detect-faces", async (HttpContext context, [FromServices] IAIService aiService) =>
        //        {
        //            try
        //            {
        //                var form = await context.Request.ReadFormAsync();
        //                var file = form.Files.FirstOrDefault();

        //                if (file == null)
        //                    return Results.BadRequest("No image file provided");

        //                using var stream = file.OpenReadStream();
        //                var result = await aiService.DetectFaces(stream);

        //                return Results.Ok(new
        //                {
        //                    faceCount = result.FaceCount,
        //                    faces = result.Faces
        //                });
        //            }
        //            catch (Exception ex)
        //            {
        //                return Results.BadRequest($"Error analyzing image: {ex.Message}");
        //            }
        //        });

        //        // Endpoint for scene classification
        //        app.MapPost("/ai/classify-scene", async (HttpContext context, [FromServices] IAIService aiService) =>
        //        {
        //            try
        //            {
        //                var form = await context.Request.ReadFormAsync();
        //                var file = form.Files.FirstOrDefault();

        //                if (file == null)
        //                    return Results.BadRequest("No image file provided");

        //                using var stream = file.OpenReadStream();
        //                var result = await aiService.ClassifyScene(stream);

        //                return Results.Ok(new
        //                {
        //                    isIndoor = result.IsIndoor,
        //                    confidence = result.Confidence
        //                });
        //            }
        //            catch (Exception ex)
        //            {
        //                return Results.BadRequest($"Error analyzing image: {ex.Message}");
        //            }
        //        });

        //        // Endpoint for facial expression analysis
        //        app.MapPost("/ai/analyze-expression", async (HttpContext context, [FromServices] IAIService aiService) =>
        //        {
        //            try
        //            {
        //                var form = await context.Request.ReadFormAsync();
        //                var file = form.Files.FirstOrDefault();

        //                if (file == null)
        //                    return Results.BadRequest("No image file provided");

        //                using var stream = file.OpenReadStream();
        //                var result = await aiService.AnalyzeExpression(stream);

        //                return Results.Ok(new
        //                {
        //                    hasSmile = result.HasSmile,
        //                    hasClosedEyes = result.HasClosedEyes,
        //                    expressions = result.Expressions
        //                });
        //            }
        //            catch (Exception ex)
        //            {
        //                return Results.BadRequest($"Error analyzing image: {ex.Message}");
        //            }
        //        });

        //        // Endpoint for content tagging
        //        app.MapPost("/ai/tag-content", async (HttpContext context, [FromServices] IAIService aiService) =>
        //        {
        //            try
        //            {
        //                var form = await context.Request.ReadFormAsync();
        //                var file = form.Files.FirstOrDefault();

        //                if (file == null)
        //                    return Results.BadRequest("No image file provided");

        //                using var stream = file.OpenReadStream();
        //                var result = await aiService.TagContent(stream);

        //                return Results.Ok(new { tags = result.Tags });
        //            }
        //            catch (Exception ex)
        //            {
        //                return Results.BadRequest($"Error analyzing image: {ex.Message}");
        //            }
        //        });

        //        // Batch processing endpoint for multiple images
        //        app.MapPost("/ai/batch-analyze", async (HttpContext context, [FromServices] IAIService aiService) =>
        //        {
        //            try
        //            {
        //                var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
        //                var request = JsonSerializer.Deserialize<BatchAnalysisRequest>(requestBody);

        //                if (request == null || request.ImageIds == null || !request.ImageIds.Any())
        //                    return Results.BadRequest("No image IDs provided");

        //                var results = await aiService.BatchAnalyzeImages(request.ImageIds, request.AnalysisTypes);

        //                return Results.Ok(results);
        //            }
        //            catch (Exception ex)
        //            {
        //                return Results.BadRequest($"Error in batch analysis: {ex.Message}");
        //            }
        //        });
        //    }

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



