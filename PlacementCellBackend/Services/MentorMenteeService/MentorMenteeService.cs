//Here we going to use Google Calendar API to create, delete, update mentor mentee meetings
using PlacementCellBackend.Services.MentorMenteeService.Interface;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.MentorMeetingDTOs;

namespace PlacementCellBackend.Services.MentorMenteeService;

public class MentorMenteeService : IMentorMenteeService
{
    private readonly AppDbContext _context;
    private readonly GoogleCalendarHelper _calendarHelper;

    public MentorMenteeService(AppDbContext context, GoogleCalendarHelper calendarHelper)
    {
        _context = context;
        _calendarHelper = calendarHelper;
    }

    public async Task<MeetingResponse?> CreateMentorMenteeMeeting(CreateMeetingRequest request)
    {
        try
        {
            var (eventId, meetLink) = await _calendarHelper.CreateMeetingWithMeetLinkAsync(
                request.Title,
                request.Description,
                request.StartTime,
                request.EndTime,
                request.StudentEmail,
                request.AlumniEmail
            );

            return new MeetingResponse
            {
                MeetingId = Guid.NewGuid().ToString(),
                GoogleEventId = eventId,
                GoogleMeetLink = meetLink,
                StartTime = request.StartTime,
                EndTime = request.EndTime
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating meeting: {ex.Message}");
            return null;
        }
    }

    public async Task<bool> DeleteMentorMenteeMeeting(string eventId)
    {
        try
        {
            return await _calendarHelper.DeleteMeetingAsync(eventId);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting meeting: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> UpdateMentorMenteeMeeting(UpdateMeetingRequest request)
    {
        try
        {
            return await _calendarHelper.UpdateMeetingAsync(
                request.EventId,
                request.NewTitle,
                request.NewStartTime,
                request.NewEndTime
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating meeting: {ex.Message}");
            return false;
        }
    }
}
