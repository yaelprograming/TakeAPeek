using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Services.IServices
{
    public interface ITagService
    {
        Task<Tag> GetTag(int id);
        Task<IEnumerable<Tag>> GetAllTags();
        Task<Tag> CreateTag(Tag tag);
        Task<Tag> UpdateTag(Tag tag);
        Task<bool> DeleteTag(int id);
    }

}
