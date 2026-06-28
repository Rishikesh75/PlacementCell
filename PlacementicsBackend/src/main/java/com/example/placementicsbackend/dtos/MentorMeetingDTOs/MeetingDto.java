namespace PlacementCellBackend.DTOs.MentorMeetingDTOs;

public class CreateMeetingRequest
{
    public string StudentId { get; set; } = string.Empty;
    public string AlumniId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string StudentEmail { get; set; } = string.Empty;
    public string AlumniEmail { get; set; } = string.Empty;
}

public class MeetingResponse
{
    public string MeetingId { get; set; } = string.Empty;
    public string GoogleMeetLink { get; set; } = string.Empty;
    public string GoogleEventId { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}

public class UpdateMeetingRequest
{
    public string EventId { get; set; } = string.Empty;
    public string? NewTitle { get; set; }
    public DateTime? NewStartTime { get; set; }
    public DateTime? NewEndTime { get; set; }
}
