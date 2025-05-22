namespace TakeAPeek_server.Services.IServices
{
    public interface IS3Service
    {
        Task UploadFileAsync(Stream stream, string key);

    }
}
