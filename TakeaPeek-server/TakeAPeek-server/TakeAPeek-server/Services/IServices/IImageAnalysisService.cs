namespace TakeAPeek_server.Services.IServices
{
    public interface IImageAnalysisService
    {
        Task<AnalyzedImageResult> AnalyzeImageAsync(byte[] imageBytes);

    }
}
