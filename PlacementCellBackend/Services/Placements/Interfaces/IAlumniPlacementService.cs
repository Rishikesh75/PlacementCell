using PlacementCellBackend.DTOs.AlumniJobOpenings;

namespace PlacementCellBackend.Services.Placements.Interfaces
{
    public interface IAlumniPlacementService
    {
        Task<IEnumerable<AlumniJobOpeningDto>> GetAllAlumniJobPostionAsync();
        Task<AlumniJobOpeningDto?> GetAlumniPlacementByIdAsync(int id);
        Task<bool> CreateAlumniPlacementAsync(AlumniJobOpeningCreateDto alumniPlacement);
        Task<bool> UpdateAlumniPlacementAsync(int id, AlumniJobOpeningCreateDto alumniPlacement);
        Task<bool> DeleteAlumniPlacementAsync(int id);
    }
}

