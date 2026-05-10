using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;

namespace PlacementCellBackend.Services.MentorMenteeService;

public class GoogleCalendarHelper
{
    private readonly IConfiguration _configuration;
    private CalendarService? _calendarService;
    private readonly string[] _scopes = { CalendarService.Scope.Calendar };

    public GoogleCalendarHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<CalendarService> GetCalendarServiceAsync()
    {
        if (_calendarService != null)
            return _calendarService;

        var serviceAccountKeyPath = _configuration["GoogleCalendar:ServiceAccountKeyPath"];
        var applicationName = _configuration["GoogleCalendar:ApplicationName"] ?? "PlacementCell MentorMentee";

        GoogleCredential credential;

        using (var stream = new FileStream(serviceAccountKeyPath!, FileMode.Open, FileAccess.Read))
        {
            credential = GoogleCredential.FromStream(stream)
                .CreateScoped(_scopes);
        }

        _calendarService = new CalendarService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credential,
            ApplicationName = applicationName
        });

        return _calendarService;
    }

    /// <summary>
    /// Creates a meeting with Jitsi Meet link and Google Calendar event
    /// </summary>
    public async Task<(string eventId, string meetLink)> CreateMeetingWithMeetLinkAsync(
        string title,
        string description,
        DateTime startTime,
        DateTime endTime,
        string studentEmail,
        string alumniEmail)
    {
        var service = await GetCalendarServiceAsync();

        // Generate a free Jitsi Meet link (no account required, works instantly)
        // Note: Google Meet requires Google Workspace with Domain-Wide Delegation
        string meetingId = Guid.NewGuid().ToString("N").Substring(0, 12);
        string jitsiMeetLink = $"https://meet.jit.si/PlacementCell-{meetingId}";

        var newEvent = new Event
        {
            Summary = title,
            Description = $"{description}\n\n📹 Video Meeting Link: {jitsiMeetLink}\n\n👥 Attendees:\n- {studentEmail}\n- {alumniEmail}",
            Start = new EventDateTime
            {
                DateTimeDateTimeOffset = new DateTimeOffset(
                    DateTime.SpecifyKind(startTime, DateTimeKind.Unspecified), 
                    TimeSpan.FromHours(5.5)),
                TimeZone = "Asia/Kolkata"
            },
            End = new EventDateTime
            {
                DateTimeDateTimeOffset = new DateTimeOffset(
                    DateTime.SpecifyKind(endTime, DateTimeKind.Unspecified), 
                    TimeSpan.FromHours(5.5)),
                TimeZone = "Asia/Kolkata"
            },
            Reminders = new Event.RemindersData
            {
                UseDefault = false,
                Overrides = new List<EventReminder>
                {
                    new EventReminder { Method = "popup", Minutes = 10 }
                }
            }
        };

        var request = service.Events.Insert(newEvent, "primary");
        request.SendUpdates = EventsResource.InsertRequest.SendUpdatesEnum.None;

        var createdEvent = await request.ExecuteAsync();

        return (createdEvent.Id, jitsiMeetLink);
    }

    /// <summary>
    /// Updates an existing meeting
    /// </summary>
    public async Task<bool> UpdateMeetingAsync(
        string eventId,
        string? newTitle = null,
        DateTime? newStartTime = null,
        DateTime? newEndTime = null)
    {
        var service = await GetCalendarServiceAsync();

        var existingEvent = await service.Events.Get("primary", eventId).ExecuteAsync();

        if (newTitle != null)
            existingEvent.Summary = newTitle;

        if (newStartTime != null)
            existingEvent.Start = new EventDateTime
            {
                DateTimeDateTimeOffset = new DateTimeOffset(
                    DateTime.SpecifyKind(newStartTime.Value, DateTimeKind.Unspecified), 
                    TimeSpan.FromHours(5.5)),
                TimeZone = "Asia/Kolkata"
            };

        if (newEndTime != null)
            existingEvent.End = new EventDateTime
            {
                DateTimeDateTimeOffset = new DateTimeOffset(
                    DateTime.SpecifyKind(newEndTime.Value, DateTimeKind.Unspecified), 
                    TimeSpan.FromHours(5.5)),
                TimeZone = "Asia/Kolkata"
            };

        var request = service.Events.Update(existingEvent, "primary", eventId);
        request.SendUpdates = EventsResource.UpdateRequest.SendUpdatesEnum.None;

        await request.ExecuteAsync();
        return true;
    }

    /// <summary>
    /// Deletes/Cancels a meeting
    /// </summary>
    public async Task<bool> DeleteMeetingAsync(string eventId)
    {
        var service = await GetCalendarServiceAsync();

        var request = service.Events.Delete("primary", eventId);
        request.SendUpdates = EventsResource.DeleteRequest.SendUpdatesEnum.None;

        await request.ExecuteAsync();
        return true;
    }

    /// <summary>
    /// Gets meeting details
    /// </summary>
    public async Task<Event?> GetMeetingAsync(string eventId)
    {
        var service = await GetCalendarServiceAsync();
        return await service.Events.Get("primary", eventId).ExecuteAsync();
    }
}
