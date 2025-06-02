using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Services.IServices
{
    public interface IUserRoleService
    {
        Task<UserRole> AddUserRole(int userId, int roleId);

        Task<string[]> GetUserRoles(int userId);

    }
}
