namespace TakeAPeek_server.Entities
{
    public class File
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public long Size { get; set; }
        public string S3Key { get; set; }
        public int? FolderId { get; set; }
        public int OwnerId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }

        // שדות תוצאה מניתוח AI
        public bool? IsBlurry { get; set; }
        public int? PeopleCount { get; set; }
        public bool? EyesClosed { get; set; }
        public string? Category { get; set; }
        public bool? IsOutdoor { get; set; }
        public bool AnalysisCompletedIs { get; set; } = false;
    }
}

