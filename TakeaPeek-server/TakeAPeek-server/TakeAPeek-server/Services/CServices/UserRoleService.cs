using Microsoft.AspNetCore.Identity;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services.CServices
{
    public class UserRoleService:IUserRoleService
    {
        private readonly DataContext _context;

        public UserRoleService(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // פונקציה להוסיף קשר בין משתמש לתפקיד
        public async Task<UserRole> AddUserRole(int userId, int roleId)
        {
            var userRole = new UserRole
            {
                UserId = userId,
                RoleId = roleId
            };
            try
            {
                _context.UserRoles.Add(userRole);
                await _context.SaveChangesAsync();
                Console.WriteLine("UserRole saved successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($" Failed to save UserRole: {ex.Message}");
            }

            return userRole;  // מחזיר את קשר המשתמש-תפקיד שנוסף
        }
    }
}
