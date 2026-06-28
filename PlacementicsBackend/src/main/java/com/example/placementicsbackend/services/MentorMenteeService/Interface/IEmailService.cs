namespace PlacementCellBackend.Services.MentorMenteeService.Interface;

public interface IEmailService
{
    Task<bool> SendMeetingInviteAsync(
        string recipientEmail,
        string recipientName,
        string meetingTitle,
        string meetingDescription,
        DateTime startTime,
        DateTime endTime,
        string meetLink,
        string otherAttendeeEmail);
}
