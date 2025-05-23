using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.Entities;

namespace TakeAPeek_server.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<TakeAPeek_server.Entities.File> Files { get; set; }
        public DbSet<Folder> Folders { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Collage> Collages { get; set; }
        public DbSet<Role>Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Event> Events { get; set; }

    }
}
