using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Interfaces
{
    public interface IFeedbackOnCompanyService
    {
        Task<IEnumerable<FeedBackOnCompany>> GetAllFeedbacksAsync();
        Task<FeedBackOnCompany?> GetFeedbackByIdAsync(string id);
        Task<FeedBackOnCompany> CreateFeedbackAsync(FeedBackOnCompany feedback);
        Task<bool> UpdateFeedbackAsync(string id, FeedBackOnCompany feedback);
        Task<bool> DeleteFeedbackAsync(string id);
    }
}

