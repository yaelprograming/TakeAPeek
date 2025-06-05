using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.Controllers;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services.CServices
{
    //   public User GetById() =>{return new User(); }
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IUserRoleService _userRoleService;

        public UserService(DataContext context, IUserRoleService userRoleService)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userRoleService = userRoleService?? throw new ArgumentNullException(nameof(userRoleService));
        }
        public async Task<User> GetUser(int id) => await _context.Users.FindAsync(id);

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<User> CreateUser(RegisterModel model)
        {
            Console.WriteLine("userService- name: "+model.Name);
            // ודא שהסיסמה נשמרת בצורה מאובטחת
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);
            // יצירת המשתמש החדש
            var user = new User
            {
                Name = model.Name,
                Password = hashedPassword,
                Email = model.Email,
                Role = model.RoleName == "Editor"  || model.RoleName == "Admin"|| model.RoleName == "Viewer"?model.RoleName:"Editor"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // מציאת התפקיד הרצוי
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == user.Role);
            Console.WriteLine("role: "+role.RoleName);
            Console.WriteLine($"find role:  {user.Role}");

            if (role == null)
            {
                Console.WriteLine("not found");
                return null; // אם התפקיד לא נמצא, מחזיר null
            }
            // אם התפקיד קיים, יוצרים את הקשר בטבלת UserRoles

            await _userRoleService.AddUserRole(user.Id, role.Id);
            await _context.SaveChangesAsync();  // שמירה של הקשר בטבלה UserRoles
            return user; // מחזיר את המשתמש החדש שנוצר
        }

        public async Task<User> UpdateUser(User User)
        {
            _context.Users.Update(User);
            await _context.SaveChangesAsync();
            return User;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var User = await GetUser(id);
            if (User == null) return false;

            _context.Users.Remove(User);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User> AuthenticateAsync(string email, string password)
        {
            Console.WriteLine("find user");
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                Console.WriteLine("not found or worng password");
                return null;
            }
            //return user.Role;
            //Console.WriteLine("user!!!: "+user.Id);
            //var roles = await _context.UserRoles
            //    .Where(ur => ur.UserId == user.Id)
            //    .Include(ur => ur.Role)  // טוען את התפקידים
            //    .Select(ur => ur.Role.RoleName)
            //    .ToArrayAsync();

            //Console.WriteLine($"user roles: {string.Join(", ", roles)}");

            //// כאן נוכל להחזיר את התפקידים כ-Claims בטוקן JWT
            //return string.Join(",", roles);
            return user;
        }
    }
}


//    public async Task<User> CreateUser(User user)
//    {
//    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
//    _context.Users.Add(user);
//    await _context.SaveChangesAsync(); // שמירה ראשונה כדי שנוכל לגשת ל-Id של המשתמש
//    var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == user.Role);
//    if (role != null)
//    {
//        var userRole = new UserRole
//        {
//            UserId = user.Id,
//            RoleId = role.Id
//        };//        _context.UserRoles.Add(userRole);
//        await _context.SaveChangesAsync();
//    }
//    return user;
//}

