using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services.CServices
{
    public class ImageAnalysisService : IImageAnalysisService
    {
        private readonly HttpClient _httpClient;
        private readonly string _openAiApiKey;

        public ImageAnalysisService(IConfiguration config)
        {
            _httpClient = new HttpClient();
            _openAiApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _openAiApiKey);
            _httpClient.Timeout = TimeSpan.FromMinutes(30);
        }

        public async Task<AnalyzedImageResult> AnalyzeImageAsync(byte[] imageBytes)
        {
            Console.WriteLine("******************open ai key: "+_openAiApiKey);
            var base64 = Convert.ToBase64String(imageBytes);

            var body = new
            {
                model = "gpt-4o-mini",
                messages = new[] {
                    new {
                        role = "user",
                        content = new object[] {
                            new { type = "text", text = "Analyze the image by categories: general category, is it blurry, are there people and how many, indoor/outdoor, are there eyes closed. Return JSON." },
                            new { type = "image_url", image_url = new { url = $"data:image/jpeg;base64,{base64}" } }
                        }
                    }
                },
                max_tokens = 500
            };

            var requestContent = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
            Console.WriteLine("**************requestContent: "+requestContent);
            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", requestContent);
            Console.WriteLine("**************response: " + response);
            var responseString = await response.Content.ReadAsStringAsync();
            Console.WriteLine("*************responseString: "+ responseString);
            using var doc = JsonDocument.Parse(responseString);
            var content = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            var jsonText = content
                .Replace("```json", "")
                .Replace("```", "")
                .Trim();

            var result = JsonSerializer.Deserialize<AnalyzedImageResult>(jsonText);
            Console.WriteLine("**************result: " + result);
            return result;
        }
    }
}


public class AnalyzedImageResult
{
    [JsonPropertyName("general_category")]
    public string Category { get; set; }

    [JsonPropertyName("is_blurry")]
    public bool IsBlurry { get; set; }

    [JsonPropertyName("people_count")]
    public int PeopleCount { get; set; }

    [JsonPropertyName("are_eyes_closed")]
    public bool HasClosedEyes { get; set; }

    [JsonPropertyName("indoor_outdoor")]
    public string IndoorOutdoorText { get; set; }

    public bool IsOutdoor => IndoorOutdoorText?.ToLower() == "outdoor";

}
