using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services.CServices
{
    public class CollageService : ICollageService
    {
        private readonly DataContext _context;
        public CollageService(DataContext context)
        {
            _context = context;
        }
        public async Task<Collage> CreateCollage(Collage collage)
        {
            _context.Collages.Add(collage);
            await _context.SaveChangesAsync();
            return collage;
        }

        public async Task<bool> DeleteCollage(int id)
        {
            var collage = await GetCollage(id);
            if (collage == null) return false;

            _context.Collages.Remove(collage);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Collage>> GetAllCollages() => await _context.Collages.ToListAsync();

        public async Task<Collage> GetCollage(int id) => await _context.Collages.FindAsync(id);

        public async Task<Collage> UpdateCollage(Collage collage)
        {
            _context.Collages.Update(collage);
            await _context.SaveChangesAsync();
            return collage;
        }
    }
}
