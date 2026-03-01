using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.CRUD.Interfaces;

public interface ICollageService
{
    Task<IEnumerable<College>> GetAllCollegesAsync();
    Task<College?> GetCollegeByIdAsync(int id);
    Task<College> CreateCollegeAsync(College college);
    Task<bool> UpDateCollegeAsync(int id, College college);
    Task<bool> DeleteCollegeAsync(int id);
}