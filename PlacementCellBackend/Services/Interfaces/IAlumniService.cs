using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Interfaces
{
    public interface IAlumniService
    {
        Task<IEnumerable<Alumni>> GetAllAlumniAsync();
        Task<Alumni?> GetAlumniByIdAsync(string id);
        Task<Alumni> CreateAlumniAsync(Alumni alumni);
        Task<bool> UpdateAlumniAsync(string id, Alumni alumni);
        Task<bool> DeleteAlumniAsync(string id);
        bool AlumniExists(string id);
    }
}

