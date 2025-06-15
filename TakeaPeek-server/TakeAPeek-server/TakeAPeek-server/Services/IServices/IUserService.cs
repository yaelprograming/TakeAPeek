using TakeAPeek_server.Controllers;
using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Services.IServices
{
    public interface IUserService
    {
        Task<User> GetUser(int Id);
        Task<IEnumerable<User>> GetAllUsers();
        //Task<User> CreateUser(User user);
        Task<User> CreateUser(RegisterModel model);
        Task<User> UpdateUser(User user);
        Task<bool> DeleteUser(int Id);
        //Task<string> AuthenticateAsync(string username, string password);
        Task<User> AuthenticateAsync(string email, string password);
        Task<User?> GetUserByEmail(string email);
    }
}
