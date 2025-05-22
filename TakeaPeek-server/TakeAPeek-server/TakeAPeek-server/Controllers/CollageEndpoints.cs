using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Controllers
{
    //public static class CollageEndpoints
    //{
    //    public static void MapCollageEndpoints(WebApplication app, ICollageService collageService)
    //    {
    //        app.MapGet("/collages", async () => await collageService.GetAllCollages());

    //        app.MapGet("/collages/{id}", async (int id) => await collageService.GetCollage(id));

    //        app.MapPost("/collages", async (Collage collage) => await collageService.CreateCollage(collage));

    //        app.MapPut("/collages/{id}", async (int id, Collage collage) =>
    //        {
    //            collage.Id = id; // לוודא שה-ID מעודכן
    //            return await collageService.UpdateCollage(collage);
    //        });

    //        app.MapDelete("/collages/{id}", async (int id) => await collageService.DeleteCollage(id));
    //    }
    //}

    using Microsoft.AspNetCore.Builder;


    public static class CollageEndpoints
    {
        public static void MapCollageEndpoints(WebApplication app)
        {
            app.MapGet("/collages", async (ICollageService collageService) => await collageService.GetAllCollages()).RequireAuthorization();

            app.MapGet("/collages/{id}", async (int id, ICollageService collageService) => await collageService.GetCollage(id)).RequireAuthorization();

            app.MapPost("/collages", async (Collage collage, ICollageService collageService) => await collageService.CreateCollage(collage)).RequireAuthorization("Editor", "Admin");

            app.MapPut("/collages/{id}", async (int id, Collage collage, ICollageService collageService) =>
            {
                collage.Id = id; // לוודא שה-ID מעודכן
                return await collageService.UpdateCollage(collage);
            }).RequireAuthorization("Editor", "Admin");

            app.MapDelete("/collages/{id}", async (int id, ICollageService collageService) => await collageService.DeleteCollage(id)).RequireAuthorization("Editor", "Admin");
        }
    }

}
