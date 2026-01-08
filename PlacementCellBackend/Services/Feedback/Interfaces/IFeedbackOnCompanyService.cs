using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Feedback.Interfaces
{
    public interface IFeedbackOnCompanyService
    {
        Task<IEnumerable<AlumniFeedBackonCompany>> GetAllFeedbacksAsync();
        Task<AlumniFeedBackonCompany?> GetFeedbackByIdAsync(string id);
        Task<AlumniFeedBackonCompany> CreateFeedbackAsync(AlumniFeedBackonCompany feedback);
        Task<bool> UpdateFeedbackAsync(string id, AlumniFeedBackonCompany feedback);
        Task<bool> DeleteFeedbackAsync(string id);
    }
}

