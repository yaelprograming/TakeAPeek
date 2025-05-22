//using Amazon.S3;
//using Amazon.S3.Model;
//using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using TakeAPeek_server.DataAccess;
//using TakeAPeek_server.Entities;
//using TakeAPeek_server.Services.IServices;

//namespace TakeAPeek_server.Services.CServices
//{
//    public class FileService : IFileService
//    {
//        private readonly DataContext _context;
//        private readonly IAmazonS3 _s3Client;
//        private string bucketName;


//        public FileService(DataContext context,IAmazonS3 s3Client,IConfiguration configuration)
//        {
//            _s3Client = s3Client;
//            _context = context;
//           bucketName = configuration["AWS_BUCKET_NAME"];
//        }
//        public async Task<TakeAPeek_server.Entities.File> GetFile(int id) => await _context.Files.Where(f => f.Id == id && !f.IsDeleted).FirstOrDefaultAsync();

//        public async Task<IEnumerable<TakeAPeek_server.Entities.File>> GetAllFiles() 
//        {
//            return await _context.Files.Where(f => !f.IsDeleted).ToListAsync();
//        }

//        public async Task<TakeAPeek_server.Entities.File> CreateFile(TakeAPeek_server.Entities.File file)
//        {
//            _context.Files.Add(file);
//            await _context.SaveChangesAsync();
//            return file;
//        }

//        public async Task<TakeAPeek_server.Entities.File> UpdateFile(TakeAPeek_server.Entities.File file)
//        {
//            _context.Files.Update(file);
//            await _context.SaveChangesAsync();
//            return file;
//        }

//        public async Task<bool> DeleteFile(int id)
//        {
//            TakeAPeek_server.Entities.File file = await GetFile(id);
//            if (file == null) return false;

//            file.IsDeleted = true; 
//            _context.Files.Update(file);
//            await _context.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> RestoreFile(int id)
//        {
//            var file = await _context.Files
//                .Where(f => f.Id == id && f.IsDeleted)
//                .FirstOrDefaultAsync();
//            if (file == null) return false;

//            file.IsDeleted = false; 
//            _context.Files.Update(file);
//            await _context.SaveChangesAsync();
//            return true;
//        }

//        //מחזיר את תקית האבא
//        public async Task<Folder> GetParentFolderAsync(int fileId)
//        {
//            // מציאת התיקיה לפי ה-ID שלה
//            var file = await _context.Files.FindAsync(fileId);
//            return file?.FolderId != null ? await _context.Folders.FindAsync(file.FolderId) : null;
//        }
//        //שליפה לפי תקיה
//        public async Task<IEnumerable<TakeAPeek_server.Entities.File>> GetFilesByFolder(int folderId)
//        {
//            return await _context.Files
//                .Where(f => f.FolderId == folderId && !f.IsDeleted)
//                .ToListAsync();
//        }

//        //?
//        public async Task<IEnumerable<TakeAPeek_server.Entities.File>> GetFilesByFolderId(int folderId)
//        {
//            return await _context.Files
//                .Where(f => f.FolderId == folderId) // הנחה שיש לך שדה FolderId
//                .ToListAsync();
//        }

//        //הורדה
//        public async Task<Stream> DownloadFile(int id)
//        {
//            var file = await _context.Files.FindAsync(id);
//            if (file == null || file.IsDeleted) return null;

//            // יצירת בקשה להורדת הקובץ מ-S3
//            var request = new GetObjectRequest
//            {
//                BucketName = bucketName,
//                Key = file.S3Key // המפתח של הקובץ ב-S3
//            };

//            // קבלת התגובה עם זרם הקובץ
//            var response = await _s3Client.GetObjectAsync(request);

//            return response.ResponseStream; // מחזיר את הזרם של הקובץ
//        }

//        public async Task<TakeAPeek_server.Entities.File> UploadFileToS3(TakeAPeek_server.Entities.File file, Stream fileStream)
//        {
//            if (string.IsNullOrEmpty(bucketName))
//            {
//                throw new Exception("Bucket name is not configured.");
//            }

//            // יצירת שם ייחודי לקובץ ב-S3
//            string fileKey = $"{file.FolderId}/{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

//            try
//            {
//                // העלאת הקובץ ל-S3
//                var putRequest = new PutObjectRequest
//                {
//                    BucketName = bucketName,
//                    Key = fileKey,
//                    InputStream = fileStream,
//                    ContentType = file.FileType,
//                    AutoCloseStream = true
//                };

//                await _s3Client.PutObjectAsync(putRequest);

//                // עדכון S3Key ו-CreatedAt
//                file.S3Key = fileKey;
//                file.CreatedAt = DateTime.UtcNow;

//                // שמירת הנתונים בבסיס הנתונים
//                _context.Files.Add(file);
//                await _context.SaveChangesAsync();

//                return file;
//            }
//            catch (Exception ex)
//            {
//                throw new Exception($"Error uploading file to S3: {ex.Message}");
//            }
//        }
//        //public async Task<TakeAPeek_server.Entities.File> UploadFileToS3(TakeAPeek_server.Entities.File file, Stream fileStream)
//        //{
//        //    if (string.IsNullOrEmpty(bucketName))
//        //    {
//        //        throw new Exception("Bucket name is not configured.");
//        //    }

//        //    string fileKey = $"{file.FolderId}/{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

//        //    try
//        //    {
//        //        var putRequest = new PutObjectRequest
//        //        {
//        //            BucketName = bucketName,
//        //            Key = fileKey,
//        //            InputStream = fileStream,
//        //            ContentType = file.FileType,
//        //            AutoCloseStream = true
//        //        };

//        //        var response = await _s3Client.PutObjectAsync(putRequest);

//        //        if (response.HttpStatusCode != System.Net.HttpStatusCode.OK)
//        //        {
//        //            throw new Exception($"Failed to upload file to S3. Response: {response.HttpStatusCode}");
//        //        }

//        //        Console.WriteLine($"File uploaded successfully to S3. Key: {fileKey}");

//        //        file.S3Key = fileKey;
//        //        file.CreatedAt = DateTime.UtcNow;

//        //        _context.Files.Add(file);
//        //        await _context.SaveChangesAsync();

//        //        return file;
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        Console.WriteLine($"Error uploading file to S3: {ex.Message}");
//        //        throw new Exception($"Error uploading file to S3: {ex.Message}");
//        //    }
//        //}

//        //R
//        public IResult GetPresignedUrl(string s3Key)
//        {
//            var request = new GetPreSignedUrlRequest
//            {
//                BucketName = bucketName,
//                Key = s3Key,
//                Expires = DateTime.UtcNow.AddMinutes(30),
//                Verb = HttpVerb.GET
//            };

//            var presignedUrl = _s3Client.GetPreSignedURL(request);
//            return Results.Ok(new { Url = presignedUrl });
//        }


//        //בשביל הורדת תיקיה
//        public async Task<byte[]> GetFileContent(int fileId)
//        {
//            var file = await _context.Files.FindAsync(fileId);
//            if (file == null || file.IsDeleted) return null;

//            var request = new GetObjectRequest
//            {
//                BucketName = bucketName,
//                Key = file.S3Key
//            };

//            using var response = await _s3Client.GetObjectAsync(request);
//            using var memoryStream = new MemoryStream();
//            await response.ResponseStream.CopyToAsync(memoryStream);
//            return memoryStream.ToArray();
//        }

//    }
//}

using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;
using File = TakeAPeek_server.Entities.File; // Ensure this is correctly added and the namespace exists in your project.using TakeAPeek_server.Services.IServices;
namespace TakeAPeek_server.Services.CServices
{
    public class FileService : IFileService
    {
        private readonly DataContext _context;
        private readonly IAmazonS3 _s3Client;
        private string bucketName;


        public FileService(DataContext context, IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _context = context;
            bucketName = configuration["AWS_BUCKET_NAME"];
        }
        public async Task<File> GetFile(int id) => await _context.Files.Where(f => f.Id == id && !f.IsDeleted).FirstOrDefaultAsync();

        public async Task<IEnumerable<File>> GetAllFiles()
        {
            return await _context.Files.Where(f => !f.IsDeleted).ToListAsync();
        }

        public async Task<File> CreateFile(File file)
        {
            _context.Files.Add(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<File> UpdateFile(File file)
        {
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<bool> DeleteFile(int id)
        {
            File file = await GetFile(id);
            if (file == null) return false;

            file.IsDeleted = true;
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreFile(int id)
        {
            var file = await _context.Files
                .Where(f => f.Id == id && f.IsDeleted)
                .FirstOrDefaultAsync();
            if (file == null) return false;

            file.IsDeleted = false;
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return true;
        }

        //מחזיר את תקית האבא
        public async Task<Folder> GetParentFolderAsync(int fileId)
        {
            // מציאת התיקיה לפי ה-ID שלה
            var file = await _context.Files.FindAsync(fileId);
            return file?.FolderId != null ? await _context.Folders.FindAsync(file.FolderId) : null;
        }
        //שליפה לפי תקיה
        public async Task<IEnumerable<File>> GetFilesByFolder(int folderId)
        {
            return await _context.Files
                .Where(f => f.FolderId == folderId && !f.IsDeleted)
                .ToListAsync();
        }

        //?
        public async Task<IEnumerable<File>> GetFilesByFolderId(int folderId)
        {
            return await _context.Files
                .Where(f => f.FolderId == folderId) // הנחה שיש לך שדה FolderId
                .ToListAsync();
        }

        //הורדה
        public async Task<Stream> DownloadFile(int id)
        {
            var file = await _context.Files.FindAsync(id);
            if (file == null || file.IsDeleted) return null;

            // יצירת בקשה להורדת הקובץ מ-S3
            var request = new GetObjectRequest
            {
                BucketName = bucketName,
                Key = file.S3Key // המפתח של הקובץ ב-S3
            };

            // קבלת התגובה עם זרם הקובץ
            var response = await _s3Client.GetObjectAsync(request);

            return response.ResponseStream; // מחזיר את הזרם של הקובץ
        }
    
        public async Task<File> UploadFileToS3(File file, Stream fileStream)
        {
            if (string.IsNullOrEmpty(bucketName))
            {
                throw new Exception("Bucket name is not configured.");
            }

            // יצירת שם ייחודי לקובץ ב-S3
            string fileKey = $"{file.FolderId}/{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            
            try
            {
                // העלאת הקובץ ל-S3
                var putRequest = new PutObjectRequest
                {
                    BucketName = bucketName,
                    Key = fileKey,
                    InputStream = fileStream,
                    ContentType = file.FileType,
                    AutoCloseStream = true
                };

                await _s3Client.PutObjectAsync(putRequest);

                // עדכון S3Key ו-CreatedAt
                file.S3Key = fileKey;
                file.CreatedAt = DateTime.UtcNow;

                // שמירת הנתונים בבסיס הנתונים
                _context.Files.Add(file);
                await _context.SaveChangesAsync();

                return file;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading file to S3: {ex.Message}");
            }
        }
        //public async Task<TakeAPeek_server.Entities.File> UploadFileToS3(TakeAPeek_server.Entities.File file, Stream fileStream)
        //{
        //    if (string.IsNullOrEmpty(bucketName))
        //    {
        //        throw new Exception("Bucket name is not configured.");
        //    }

        //    string fileKey = $"{file.FolderId}/{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

        //    try
        //    {
        //        var putRequest = new PutObjectRequest
        //        {
        //            BucketName = bucketName,
        //            Key = fileKey,
        //            InputStream = fileStream,
        //            ContentType = file.FileType,
        //            AutoCloseStream = true
        //        };

        //        var response = await _s3Client.PutObjectAsync(putRequest);

        //        if (response.HttpStatusCode != System.Net.HttpStatusCode.OK)
        //        {
        //            throw new Exception($"Failed to upload file to S3. Response: {response.HttpStatusCode}");
        //        }

        //        Console.WriteLine($"File uploaded successfully to S3. Key: {fileKey}");

        //        file.S3Key = fileKey;
        //        file.CreatedAt = DateTime.UtcNow;

        //        _context.Files.Add(file);
        //        await _context.SaveChangesAsync();

        //        return file;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error uploading file to S3: {ex.Message}");
        //        throw new Exception($"Error uploading file to S3: {ex.Message}");
        //    }
        //}

        //R
        public IResult GetPresignedUrl(string s3Key)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = s3Key,
                Expires = DateTime.UtcNow.AddMinutes(30),
                Verb = HttpVerb.GET
            };

            var presignedUrl = _s3Client.GetPreSignedURL(request);
            return Results.Ok(new { Url = presignedUrl });
        }

     
        //בשביל הורדת תיקיה

        public async Task<byte[]> GetFileContent(int fileId)
        {
            var file = await _context.Files.FindAsync(fileId);
            if (file == null || file.IsDeleted) return null;

            var request = new GetObjectRequest
            {
                BucketName = bucketName,
                Key = file.S3Key
            };

            using var response = await _s3Client.GetObjectAsync(request);
            using var memoryStream = new MemoryStream();
            await response.ResponseStream.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }

    }
}


/*
         



//kvuxh;
    


 */