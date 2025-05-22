using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Services.IServices
{
    public interface ICollageService
    {
        Task<Collage> GetCollage(int id);
        Task<IEnumerable<Collage>> GetAllCollages();
        Task<Collage> CreateCollage(Collage collage);
        Task<Collage> UpdateCollage(Collage collage);
        Task<bool> DeleteCollage(int id);
    }
}
