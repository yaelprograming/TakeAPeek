using Microsoft.AspNetCore.Mvc;
using NLog;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Controllers
{
    public static class EventEndpoints
    {
        public static void MapEventEndpoints(WebApplication app)
        {
            var logger = LogManager.GetCurrentClassLogger();
            LogManager.LoadConfiguration("NLog.config");

            // Get all events
            app.MapGet("/events", async (IEventService eventService) =>
                await eventService.GetAllEventsAsync());

            // Get event by ID
            app.MapGet("/events/{id}", async (string id, IEventService eventService) =>
            {
                var eventEntity = await eventService.GetEventByIdAsync(id);
                return eventEntity != null ? Results.Ok(eventEntity) : Results.NotFound("Event not found");
            });

            // Get events by user ID
            app.MapGet("/events/user", async (HttpContext http, IEventService eventService) =>
            {
                var userIdStr = http.User.FindFirst("userId")?.Value
                 ?? http.User.FindFirst("sub")?.Value; 
                if (!int.TryParse(userIdStr, out var userId))
                    return Results.Unauthorized();

                var events = await eventService.GetEventsByUserIdAsync(userId);
                return Results.Ok(events);
            });

            // Get events by date range
            app.MapGet("/events/range", async ([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, [FromQuery] int userId, IEventService eventService) =>
                await eventService.GetEventsByDateRangeAsync(startDate, endDate, userId));

            // Get upcoming events
            app.MapGet("/events/upcoming/{userId}", async (int userId, [FromQuery] int days, IEventService eventService) =>
                await eventService.GetUpcomingEventsAsync(userId, days > 0 ? days : 30));

            // Get today's events
            app.MapGet("/events/today/{userId}", async (int userId, IEventService eventService) =>
                await eventService.GetTodayEventsAsync(userId));

            // Create a new event
            app.MapPost("/events", async (Event eventEntity, IEventService eventService) =>
            {
                try
                {
                    var createdEvent = await eventService.CreateEventAsync(eventEntity);
                    return Results.Created($"/events/{createdEvent.Id}", createdEvent);
                }
                catch (Exception ex)
                {
                    logger.Error(ex, "Error creating event");
                    return Results.BadRequest($"Error creating event: {ex.Message}");
                }
            });

            // Update an existing event
            app.MapPut("/events/{id}", async (string id, Event eventEntity, IEventService eventService) =>
            {
                if (id != eventEntity.Id)
                    return Results.BadRequest("ID mismatch");

                var updatedEvent = await eventService.UpdateEventAsync(eventEntity);
                return updatedEvent != null ? Results.Ok(updatedEvent) : Results.NotFound("Event not found");
            });

            // Delete an event
            app.MapDelete("/events/{id}", async (string id, IEventService eventService) =>
            {
                var result = await eventService.DeleteEventAsync(id);
                return result ? Results.NoContent() : Results.NotFound("Event not found");
            });
        }
    }
}
