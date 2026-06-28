using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Services.CRUD;

public class CollageService : ICollageService
{
    private readonly AppDbContext _context;

    public CollageService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<College>> GetAllCollegesAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<College?> GetCollegeByIdAsync(int id)
    {
       throw new NotImplementedException();
    }

    public async Task<College> CreateCollegeAsync(College college)
    {
       throw new NotImplementedException();
    }
    
    public async Task<bool> UpDateCollegeAsync(int id, College college)
    {
       throw new NotImplementedException();
    }

    public async Task<bool> DeleteCollegeAsync(int id)
    {
       throw new NotImplementedException();
    }
}