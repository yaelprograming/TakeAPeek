
using Microsoft.AspNetCore.Mvc;
using TakeAPeek_server.Entities;
using File = TakeAPeek_server.Entities.File;
namespace TakeAPeek_server.Services.IServices
{
    public interface IFileService
    {
        //Task<File> GetFile(int id);
        //Task<IEnumerable<File>> GetAllFiles();
        //Task<File> CreateFile(File file);
        //Task<File> UpdateFile(File file);
        //Task<bool> DeleteFile(int id);
        ////?
        //Task<File> UploadFileToS3(File file, Stream fileStream);
        //Task<Stream> DownloadFile(int id);
        ////R
        //IResult GetPresignedUrl(string fileName);
        ////הורדה
        //Task<byte[]> GetFileContent(int fileId);
        //Task<bool> RestoreFile(int id);
        //Task<Folder> GetParentFolderAsync(int fileId);
        //Task<IEnumerable<File>> GetFilesByFolder(int folderId); // הוסף כאן

        Task<File> GetFile(int id);
        Task<IEnumerable<File>> GetAllFiles();
        Task<File> CreateFile(File file);
        Task<File> UpdateFile(File file);
        Task<bool> DeleteFile(int id);
        Task<bool> RestoreFile(int id);
        Task<Folder> GetParentFolderAsync(int fileId);
        Task<IEnumerable<File>> GetFilesByFolder(int folderId);
        Task<IEnumerable<File>> GetFilesByFolderId(int folderId);
        Task<Stream> DownloadFile(int id);
        Task<File> UploadFileToS3(File file, Stream fileStream);
        IResult GetPresignedUrl(string s3Key);
        Task<byte[]> GetFileContent(int fileId);
        Task UploadTest();

    }
}

/*
 namespace TakeAPeek_server.Services.IServices
{
    public interface IFileService
    {
        Task<File> GetFile(int id);
        Task<IEnumerable<File>> GetAllFiles();
        Task<File> CreateFile(File file);
        Task<File> UpdateFile(File file);
        Task<bool> DeleteFile(int id);
        Task<bool> RestoreFile(int id);
        Task<Folder> GetParentFolderAsync(int fileId);
        Task<IEnumerable<File>> GetFilesByFolder(int folderId);
        Task<IEnumerable<File>> GetFilesByFolderId(int folderId);
        Task<Stream> DownloadFile(int id);
        Task<File> UploadFileToS3(File file, Stream fileStream);
        IResult GetPresignedUrl(string s3Key);
        Task<byte[]> GetFileContent(int fileId);
    }
}

 */