//Here we going to use Google Calendar API to create, delete, update mentor mentee meetings
using PlacementCellBackend.Services.MentorMenteeService.Interface;
using PlacementCellBackend.Data;

namespace PlacementCellBackend.Services.MentorMenteeService;

public class MentorMenteeService : IMentorMenteeService
{
    private readonly AppDbContext _context;

    public MentorMenteeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateMentorMenteeMeeting()
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteMentorMenteeMeeting()
    {
        throw new NotImplementedException();
    }
    
    public async Task<bool> UpdateMentorMenteeMeeting()
    {
        throw new NotImplementedException();
    }
}