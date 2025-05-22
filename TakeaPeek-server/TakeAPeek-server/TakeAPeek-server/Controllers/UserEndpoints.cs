using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Controllers
{
    using Microsoft.AspNetCore.Builder;
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(WebApplication app)
        {
            app.MapGet("/users", async (IUserService userService) => await userService.GetAllUsers());
            //  .RequireAuthorization();

            app.MapGet("/users/{id}", async (int id, IUserService userService) => await userService.GetUser(id));
            //.RequireAuthorization();

            app.MapPost("/users", async (RegisterModel model, IUserService userService) => await userService.CreateUser(model));

            app.MapPut("/users/{id}", async (int id, User user, IUserService userService) =>
          {
              user.Id = id; // לוודא שה-ID מעודכן
              return await userService.UpdateUser(user);
          });
            //.RequireAuthorization("Editor", "Admin");

            app.MapDelete("/users/{id}", async (int id, IUserService userService) => await userService.DeleteUser(id));
            //.RequireAuthorization("Editor", "Admin");
        }
    }
}

