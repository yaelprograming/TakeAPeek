using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services
{
    public class EventService : IEventService
    {
        private readonly DataContext _context;
        private readonly ILogger<EventService> _logger;

        public EventService(DataContext context, ILogger<EventService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            try
            {
                return await _context.Events.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting all events");
                throw;
            }
        }

        public async Task<Event> GetEventByIdAsync(string id)
        {
            try
            {
                return await _context.Events.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting event with ID: {id}");
                throw;
            }
        }

        public async Task<IEnumerable<Event>> GetEventsByUserIdAsync(int userId)
        {
            try
            {
                return await _context.Events
                    .Where(e => e.UserId == userId)
                    .OrderBy(e => e.StartTime)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting events for user ID: {userId}");
                throw;
            }
        }

        public async Task<IEnumerable<Event>> GetEventsByDateRangeAsync(DateTime startDate, DateTime endDate, int userId)
        {
            try
            {
                return await _context.Events
                    .Where(e => e.UserId == userId &&
                           ((e.StartTime >= startDate && e.StartTime <= endDate) ||
                            (e.EndTime >= startDate && e.EndTime <= endDate) ||
                            (e.StartTime <= startDate && e.EndTime >= endDate)))
                    .OrderBy(e => e.StartTime)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting events for date range: {startDate} to {endDate}");
                throw;
            }
        }

        public async Task<IEnumerable<Event>> GetUpcomingEventsAsync(int userId, int days = 30)
        {
            try
            {
                var today = DateTime.Today;
                var endDate = today.AddDays(days);

                return await _context.Events
                    .Where(e => e.UserId == userId &&
                           e.StartTime >= today &&
                           e.StartTime <= endDate)
                    .OrderBy(e => e.StartTime)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting upcoming events for user ID: {userId}");
                throw;
            }
        }

        public async Task<IEnumerable<Event>> GetTodayEventsAsync(int userId)
        {
            try
            {
                var today = DateTime.Today;
                var tomorrow = today.AddDays(1);

                return await _context.Events
                    .Where(e => e.UserId == userId &&
                           e.StartTime >= today &&
                           e.StartTime < tomorrow)
                    .OrderBy(e => e.StartTime)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting today's events for user ID: {userId}");
                throw;
            }
        }

        public async Task<Event> CreateEventAsync(Event eventEntity)
        {
            try
            {
                eventEntity.Id = Guid.NewGuid().ToString();
                eventEntity.CreatedAt = DateTime.UtcNow;
                eventEntity.UpdatedAt = DateTime.UtcNow;

                _context.Events.Add(eventEntity);
                await _context.SaveChangesAsync();

                return eventEntity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating a new event");
                throw;
            }
        }

        public async Task<Event> UpdateEventAsync(Event eventEntity)
        {
            try
            {
                var existingEvent = await _context.Events.FindAsync(eventEntity.Id);
                if (existingEvent == null)
                    return null;

                // Update properties
                existingEvent.Title = eventEntity.Title;
                existingEvent.Description = eventEntity.Description;
                existingEvent.Location = eventEntity.Location;
                existingEvent.StartTime = eventEntity.StartTime;
                existingEvent.EndTime = eventEntity.EndTime;
                existingEvent.Email = eventEntity.Email;
                existingEvent.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return existingEvent;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating event with ID: {eventEntity.Id}");
                throw;
            }
        }

        public async Task<bool> DeleteEventAsync(string id)
        {
            try
            {
                var eventEntity = await _context.Events.FindAsync(id);
                if (eventEntity == null)
                    return false;

                _context.Events.Remove(eventEntity);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting event with ID: {id}");
                throw;
            }
        }
    }
}