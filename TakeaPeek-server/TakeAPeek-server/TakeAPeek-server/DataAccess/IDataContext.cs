using TakeAPeek_server.Entities;

namespace TakeAPeek_server.DataAccess
{
    public interface IDataContext
    {
        public List<User> Users { get; set; }
        void SaveChanges() { }
    }
} 