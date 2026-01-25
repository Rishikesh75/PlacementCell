using PlacementCellBackend.DTOs.ReasearchOpeningsDtos;

namespace PlacementCellBackend.Services.Placements.Interfaces
{
    public interface ITeacherPlacementService
    {
        Task<IEnumerable<ResearchOpeningDto>> GetAllTeacherResearchOpeningsAsync();
        Task<ResearchOpeningDto?> GetTeacherResearchOpeningByIdAsync(int id);
        Task<ResearchOpeningDto> CreateTeacherResearchOpeningAsync(ResearchOpeningCreateDto researchOpening);
        Task<bool> UpdateTeacherResearchOpeningAsync(int id, ResearchOpeningCreateDto researchOpening);
        Task<bool> DeleteTeacherResearchOpeningAsync(int id);
    }
}
