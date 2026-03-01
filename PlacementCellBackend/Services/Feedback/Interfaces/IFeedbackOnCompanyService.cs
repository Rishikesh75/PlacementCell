using PlacementCellBackend.DTOs;

namespace PlacementCellBackend.Services.Feedback.Interfaces
{
    public interface IFeedbackOnCompanyService
    {
        Task<IEnumerable<AlumniFeedBackOnCompanyDTO>> GetAllFeedbacksAsync();
        Task<AlumniFeedBackOnCompanyDTO?> GetFeedbackByIdAsync(string id);
        Task<AlumniFeedBackOnCompanyDTO> CreateFeedbackAsync(AlumniFeedBackOnCompanyCreateDTO feedback);
        Task<bool> UpDateFeedbackAsync(int id, AlumniFeedBackOnCompanyCreateDTO feedback);
        Task<bool> DeleteFeedbackAsync(int id);
    }
}

