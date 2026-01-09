using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Placements.Interfaces
{
    public interface ITeacherPlacementService
    {
        Task<IEnumerable<TeacherResearchOpening>> GetAllTeacherResearchOpeningsAsync();
        Task<TeacherResearchOpening?> GetTeacherResearchOpeningByIdAsync(int id);
        Task<TeacherResearchOpening> CreateTeacherResearchOpeningAsync(TeacherResearchOpening researchOpening);
        Task<bool> UpdateTeacherResearchOpeningAsync(int id, TeacherResearchOpening researchOpening);
        Task<bool> DeleteTeacherResearchOpeningAsync(int id);
    }
}
