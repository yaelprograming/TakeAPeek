namespace TakeAPeek_server.Services.IServices
{
    public interface IAIService
    {
        // Blur detection
        Task<BlurDetectionResult> DetectBlur(Stream imageStream);

        // Face detection and recognition
        Task<FaceDetectionResult> DetectFaces(Stream imageStream);
        Task<List<string>> FindSimilarFaces(string referenceImageId, List<string> targetImageIds);

        // Scene classification
        Task<SceneClassificationResult> ClassifyScene(Stream imageStream);

        // Expression analysis
        Task<ExpressionAnalysisResult> AnalyzeExpression(Stream imageStream);

        // Content tagging
        Task<ContentTaggingResult> TagContent(Stream imageStream);

        // Batch processing
        Task<Dictionary<string, object>> BatchAnalyzeImages(List<string> imageIds, List<string> analysisTypes);
    }

    public class BlurDetectionResult
    {
        public bool IsBlurry { get; set; }
        public double BlurScore { get; set; }
    }

    public class FaceDetectionResult
    {
        public int FaceCount { get; set; }
        public List<FaceInfo> Faces { get; set; } = new List<FaceInfo>();
    }

    public class FaceInfo
    {
        public string FaceId { get; set; } = string.Empty;
        public double Confidence { get; set; }
        public Dictionary<string, double> FacialAttributes { get; set; } = new Dictionary<string, double>();
    }

    public class SceneClassificationResult
    {
        public bool IsIndoor { get; set; }
        public double Confidence { get; set; }
    }

    public class ExpressionAnalysisResult
    {
        public bool HasSmile { get; set; }
        public bool HasClosedEyes { get; set; }
        public Dictionary<string, double> Expressions { get; set; } = new Dictionary<string, double>();
    }

    public class ContentTaggingResult
    {
        public List<string> Tags { get; set; } = new List<string>();
    }
}

