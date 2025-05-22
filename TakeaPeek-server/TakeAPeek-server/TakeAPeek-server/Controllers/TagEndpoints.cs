using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Controllers
{
    //public static class TagEndpoints
    //{
    //    public static void MapTagEndpoints(WebApplication app, ITagService tagService)
    //    {
    //        app.MapGet("/tags", async () => await tagService.GetAllTags());

    //        app.MapGet("/tags/{id}", async (int id) => await tagService.GetTag(id));

    //        app.MapPost("/tags", async (Tag tag) => await tagService.CreateTag(tag));

    //        app.MapPut("/tags/{id}", async (int id, Tag tag) =>
    //        {
    //            tag.Id = id; // לוודא שה-ID מעודכן
    //            return await tagService.UpdateTag(tag);
    //        });

    //        app.MapDelete("/tags/{id}", async (int id) => await tagService.DeleteTag(id));
    //    }
    //}

    using Microsoft.AspNetCore.Builder;
 

    public static class TagEndpoints
    {
        public static void MapTagEndpoints(WebApplication app)
        {
            app.MapGet("/tags", async (ITagService tagService) => await tagService.GetAllTags()).RequireAuthorization();

            app.MapGet("/tags/{id}", async (int id, ITagService tagService) => await tagService.GetTag(id)).RequireAuthorization();

            app.MapPost("/tags", async (Tag tag, ITagService tagService) => await tagService.CreateTag(tag)).RequireAuthorization("Editor", "Admin");

            app.MapPut("/tags/{id}", async (int id, Tag tag, ITagService tagService) =>
            {
                tag.Id = id; // לוודא שה-ID מעודכן
                return await tagService.UpdateTag(tag);
            }).RequireAuthorization("Editor", "Admin");

            app.MapDelete("/tags/{id}", async (int id, ITagService tagService) => await tagService.DeleteTag(id)).RequireAuthorization("Editor", "Admin");
        }
    }

}
