using PlacementCellBackend.DTOs.MentorMeetingDTOs;

namespace PlacementCellBackend.Services.MentorMenteeService.Interface;

public interface IMentorMenteeService
{
    Task<MeetingResponse?> CreateMentorMenteeMeeting(CreateMeetingRequest request);
    Task<bool> DeleteMentorMenteeMeeting(string eventId);
    Task<bool> UpdateMentorMenteeMeeting(UpdateMeetingRequest request);
}
