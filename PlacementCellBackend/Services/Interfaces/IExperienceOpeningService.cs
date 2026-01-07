using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Interfaces
{
    public interface IExperienceOpeningService
    {
        Task<IEnumerable<ExperienceOpening>> GetAllExperienceOpeningsAsync();
        Task<ExperienceOpening?> GetExperienceOpeningByIdAsync(int id);
        Task<ExperienceOpening> CreateExperienceOpeningAsync(ExperienceOpening experienceOpening);
        Task<bool> UpdateExperienceOpeningAsync(int id, ExperienceOpening experienceOpening);
        Task<bool> DeleteExperienceOpeningAsync(int id);
    }
}

