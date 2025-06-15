
using global::TakeAPeek_server.Services.CServices;
//using Microsoft.AspNetCore.Authentication.Google;
//using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using System.Security.Claims;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Controllers
{
    public static class AuthEndpoints
    {
        public static void MapAuthEndpoints(WebApplication app)
        {

            app.MapPost("/auth/login", async (LoginModel model, AuthService authService, IUserService userService,IUserRoleService userRoleService) =>
            {
                Console.WriteLine($"username: {model.Email}, Password: {model.Password}");

                //var roleName = await userService.AuthenticateAsync(model.Email, model.Password);
                //Console.WriteLine("Roles: " + string.Join(", ", roleName));

                //if (string.IsNullOrEmpty(roleName))
                //{
                //    Console.WriteLine("not found role");
                //    return Results.Unauthorized();
                //}

                //var roles = roleName.Split(",");

                //if (roles.Contains("Admin"))
                //{
                //    var token = authService.GenerateJwtToken(model.Email, roles);
                //    return Results.Ok(new { Token = token });
                //}
                //else if (roles.Contains("Editor"))
                //{
                //    var token = authService.GenerateJwtToken(model.Email, roles);
                //    return Results.Ok(new { Token = token });
                //}
                //else if (roles.Contains("Viewer"))
                //{
                //    var token = authService.GenerateJwtToken(model.Email, roles);
                //    return Results.Ok(new { Token = token });
                //}
                //return Results.Unauthorized();

                var user = await userService.AuthenticateAsync(model.Email, model.Password);
                if (user == null)
                {
                    Console.WriteLine("User not found or wrong password");
                    return Results.Unauthorized();
                }

                var roles = await userRoleService.GetUserRoles(user.Id); 

                Console.WriteLine("Roles: " + string.Join(", ", roles));

                var token = authService.GenerateJwtToken(user.Id.ToString(), user.Email, roles);

                return Results.Ok(new { Token = token });

            });


            //app.MapPost("/auth/register", async (RegisterModel model, AuthService authService, IUserService userService) =>
            //{
            //    Console.WriteLine("name: "+model.Name);
            //    if (model == null)
            //    {
            //        return Results.Conflict("User is not valid");
            //    }

            //    var existingUser = await userService.CreateUser(model);

            //    if (existingUser == null)
            //        return Results.BadRequest("Failed to create user or assign role");

            //    var token = authService.GenerateJwtToken(model.Name, new[] { model.RoleName });
            //    return Results.Ok(new { Token = token,User= existingUser });
            //});

            app.MapPost("/auth/register", async (
    RegisterModel model,
    AuthService authService,
    IUserService userService) =>
            {
                Console.WriteLine("name: " + model.Name);
                Console.WriteLine("role: " + model.RoleName);

                if (model == null)
                {
                    return Results.Conflict("User is not valid");
                }

                var existingUser = await userService.CreateUser(model);

                if (existingUser == null)
                    return Results.BadRequest("Failed to create user or assign role");

                var token = authService.GenerateJwtToken(
                    existingUser.Id.ToString(),
                    existingUser.Email,
                    new[] { model.RoleName }
                );

                return Results.Ok(new { Token = token, User = existingUser });
            });



            //app.MapGet("/auth/google/login", async (HttpContext context) =>
            //{
            //    var props = new AuthenticationProperties { RedirectUri = "/auth/google/callback" };
            //    return Results.Challenge(props, [GoogleDefaults.AuthenticationScheme]);
            //});

            //app.MapGet("/auth/google/callback", async (
            //    HttpContext context,
            //    AuthService authService,
            //    IUserService userService,
            //    IUserRoleService userRoleService) =>
            //{
            //    var result = await context.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

            //    if (!result.Succeeded || result.Principal == null)
            //        return Results.Unauthorized();

            //    var email = result.Principal.FindFirst(ClaimTypes.Email)?.Value;
            //    var name = result.Principal.FindFirst(ClaimTypes.Name)?.Value;
            //    var googleId = result.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            //    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(googleId))
            //        return Results.BadRequest("Missing Google user info");

            //    // בדיקה אם המשתמש כבר קיים במסד
            //    var user = await userService.GetUserByEmail(email);
            //    if (user == null)
            //    {
            //        // יצירת משתמש חדש
            //        var registerModel = new RegisterModel
            //        {
            //            Name = name ?? "Google User",
            //            Email = email,
            //            Password = Guid.NewGuid().ToString(), // לא בשימוש בפועל
            //            RoleName = "Editor"
            //        };

            //        user = await userService.CreateUser(registerModel);
            //        if (user == null)
            //            return Results.BadRequest("Failed to create user");
            //    }

            //    // קבלת תפקידים
            //    var roles = await userRoleService.GetUserRoles(user.Id);
            //    var token = authService.GenerateJwtToken(user.Id.ToString(), user.Email, roles);

            //    // החזרת הטוקן
            //    return Results.Ok(new { Token = token });
            //});


        }
    }
    
    public class LoginModel
    {
        //public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string RoleName { get; set; }
    }
}

//app.MapPost("/auth/login", async (LoginModel model, AuthService authService, IUserService userService) =>
//{
//    var roleName = await userService.AuthenticateAsync(model.UserName, model.Password);

//    if (string.IsNullOrEmpty(roleName))
//    {
//        Console.WriteLine("not found role");
//        return Results.Unauthorized();
//    }
//    var role = roleName.Split(",");

//    if (roleName == "admin")
//    {
//        var token = authService.GenerateJwtToken(model.UserName, new[] { "Admin" });
//        return Results.Ok(new { Token = token });
//    }
//    else if (roleName == "editor")
//    {
//        var token = authService.GenerateJwtToken(model.UserName, new[] { "Editor" });
//        return Results.Ok(new { Token = token });
//    }
//    else if (roleName == "viewer")
//    {
//        var token = authService.GenerateJwtToken(model.UserName, new[] { "Viewer" });
//        return Results.Ok(new { Token = token });
//    }

//    return Results.Unauthorized();
//});
