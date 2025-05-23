using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization;
using TakeAPeek_server.Services.IServices;
using TakeAPeek_server.DataAccess;
using static System.Net.Mime.MediaTypeNames;
using SixLabors.ImageSharp;

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

        //public async Task<AnalyzedImageResult> AnalyzeImageAsync(byte[] imageBytes)
        //{
        //    await File.WriteAllBytesAsync("debug-image.jpg", imageBytes);

        //    Console.WriteLine($"Analyzing file {imageBytes}...");

        //    Console.WriteLine("******************open ai key: " + _openAiApiKey);
        //    var base64 = Convert.ToBase64String(imageBytes);

        //    var body = new
        //    {
        //        model = "gpt-4o-mini",
        //        messages = new[] {
        //        new {
        //            role = "user",
        //            content = new object[] {
        //                new { type = "text", text = "Analyze the image by categories: general category, is it blurry, are there people and how many, indoor/outdoor, are there eyes closed. Return JSON." },
        //                new { type = "image_url", image_url = new { url = $"data:image/jpeg;base64,{base64}" } }
        //            }
        //        }
        //    },
        //        max_tokens = 500
        //    };

        //    var requestContent = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
        //    Console.WriteLine("**************requestContent: " + requestContent);
        //    var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", requestContent);
        //    Console.WriteLine("**************response: " + response);
        //    var responseString = await response.Content.ReadAsStringAsync();
        //    Console.WriteLine("*************responseString: " + responseString);
        //    using var doc = JsonDocument.Parse(responseString);
        //    //var content = doc.RootElement
        //    //    .GetProperty("choices")[0]
        //    //    .GetProperty("message")
        //    //    .GetProperty("content")
        //    //    .GetString();

        //    var jsonText = content
        //        .Replace("json", "")
        //        .Replace("", "")
        //        .Trim();

        //    var result = JsonSerializer.Deserialize<AnalyzedImageResult>(jsonText);
        //    Console.WriteLine("**************result: " + result);
        //    return result;
        //}


        public async Task<AnalyzedImageResult> AnalyzeImageAsync(byte[] imageBytes)

        {
            Console.WriteLine("******************open ai key: " + _openAiApiKey);

            File.WriteAllBytes("test.jpg", imageBytes);

            Console.WriteLine("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            //var base64 = Convert.ToBase64String(imageBytes);
            using (var img = SixLabors.ImageSharp.Image.Load(imageBytes))
            {
                using var ms = new MemoryStream();
                img.SaveAsJpeg(ms); // או SaveAsPng
                imageBytes = ms.ToArray();
                Console.WriteLine(img.Metadata.DecodedImageFormat.Name);

            }

            var base64 = Convert.ToBase64String(imageBytes)
                .Replace("\r", "")
                .Replace("\n", "");



            var body = new
            {
                model = "gpt-4o-mini",
                messages = new[] {
                    new {
                        role = "user",
                        content = new object[] {
new {
                    type = "text",
                    text =
@"You are an expert image analysis assistant. Analyze the uploaded photo and return the following in **JSON format only**:

- ""category"": general category of the image (e.g. portrait, group photo, landscape, event, other).
- ""isBlurry"": true/false — is the image blurry?
- ""peopleCount"": number of people clearly visible.
- ""isOutdoor"": true/false — is the image taken outdoors?
- ""hasClosedEyes"": true/false — does anyone have closed eyes?

If you're not 100% sure about something, estimate the best you can. Be accurate even if there are many people.

Return only valid JSON. Example:
{ ""category"": ""even, family"", ""isBlurry"": false, ""peopleCount"": 6, ""isOutdoor"": true, ""hasClosedEyes"": false }"
                },                            new { type = "image_url", image_url = new { url =$"data:image/jpeg;base64,{base64}" } }
                        }
                    }
                },
                max_tokens = 500
            };


            Console.WriteLine("body.messages : " + body.messages);
         
            var requestContent = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
            Console.WriteLine("**************requestContent: " + requestContent);
            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", requestContent);
            Console.WriteLine("**************response: " + response);
            var responseString = await response.Content.ReadAsStringAsync();
            Console.WriteLine("*************responseString: " + responseString);
            using var doc = JsonDocument.Parse(responseString);

            if (doc.RootElement.TryGetProperty("error", out var errorElement))
            {
                var errorMessage = errorElement.GetProperty("message").GetString();
                throw new Exception("OpenAI API error: " + errorMessage);
            }

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

public class FilterRequest
{
    public int FolderId { get; set; }
    public bool HideBlurry { get; set; }
    public bool HideClosedEyes { get; set; }
    public int? PeopleCount { get; set; }
    public bool? IsOutdoor { get; set; }
    public string Category { get; set; }
    public string SearchTerm { get; set; }
}

public class DownloadRequest
{
    public List<string> FileIds { get; set; }
}