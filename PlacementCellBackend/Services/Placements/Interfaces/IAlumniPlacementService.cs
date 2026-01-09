using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Placements.Interfaces
{
    public interface IAlumniPlacementService
    {
        Task<IEnumerable<AlumniJobPosition>> GetAllAlumniJobPositionAsync();
        Task<AlumniJobPosition?> GetAlumniPlacementByIdAsync(int id);
        Task<AlumniJobPosition> CreateAlumniPlacementAsync(AlumniJobPosition alumniPlacement);
        Task<bool> UpdateAlumniPlacementAsync(int id, AlumniJobPosition alumniPlacement);
        Task<bool> DeleteAlumniPlacementAsync(int id);
    }
}

