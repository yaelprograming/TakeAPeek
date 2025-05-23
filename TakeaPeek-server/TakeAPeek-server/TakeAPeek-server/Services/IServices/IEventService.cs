using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Services.IServices
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(string id);
        Task<IEnumerable<Event>> GetEventsByUserIdAsync(int userId);
        Task<IEnumerable<Event>> GetEventsByDateRangeAsync(DateTime startDate, DateTime endDate, int userId);
        Task<IEnumerable<Event>> GetUpcomingEventsAsync(int userId, int days = 30);
        Task<IEnumerable<Event>> GetTodayEventsAsync(int userId);
        Task<Event> CreateEventAsync(Event eventEntity);
        Task<Event> UpdateEventAsync(Event eventEntity);
        Task<bool> DeleteEventAsync(string id);
    }
}
