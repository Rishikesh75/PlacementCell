using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Placements.Interfaces
{
    public interface IAlumniPlacementService
    {
        Task<IEnumerable<AlumniPlacements>> GetAllAlumniPlacementsAsync();
        Task<AlumniPlacements?> GetAlumniPlacementByIdAsync(int id);
        Task<AlumniPlacements> CreateAlumniPlacementAsync(AlumniPlacements alumniPlacement);
        Task<bool> UpdateAlumniPlacementAsync(int id, AlumniPlacements alumniPlacement);
        Task<bool> DeleteAlumniPlacementAsync(int id);
    }
}

