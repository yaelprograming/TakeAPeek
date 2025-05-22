using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Services.IServices
{
    public interface IFolderService
    {
        Task<Folder> GetFolder(int id);
        Task<IEnumerable<Folder>> GetAllFolders();
        Task<Folder> CreateFolder(Folder folder);
        Task<Folder> UpdateFolder(Folder folder);
        Task<bool> DeleteFolder(int id);
        Task<Folder?> GetParentFolderAsync(int folderId);
        Task<List<Folder>> GetBreadcrumb(int folderId);
        
        //?
        Task<IEnumerable<Folder>> GetFoldersByParentId(int parentId); // הוסף כאן

        Task<List<(string RelativePath, TakeAPeek_server.Entities.File File)>> GetAllFilesInFolder(int folderId, string basePath = "");

    }
}
