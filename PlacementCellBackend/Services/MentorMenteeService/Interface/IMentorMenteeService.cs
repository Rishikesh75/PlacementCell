namespace PlacementCellBackend.Services.MentorMenteeService.Interface;
public  interface IMentorMenteeService
{
    Task<bool> CreateMentorMenteeMeeting();
    Task<bool> DeleteMentorMenteeMeeting();
    Task<bool> UpdateMentorMenteeMeeting();
}