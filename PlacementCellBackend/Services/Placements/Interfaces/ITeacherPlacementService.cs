using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Placements.Interfaces
{
    public interface ITeacherPlacementService
    {
        Task<IEnumerable<TeacherPlacements>> GetAllTeacherPlacementsAsync();
        Task<TeacherPlacements?> GetTeacherPlacementByIdAsync(int id);
        Task<TeacherPlacements> CreateTeacherPlacementAsync(TeacherPlacements teacherPlacement);
        Task<bool> UpdateTeacherPlacementAsync(int id, TeacherPlacements teacherPlacement);
        Task<bool> DeleteTeacherPlacementAsync(int id);
    }
}

