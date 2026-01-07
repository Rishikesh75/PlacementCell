using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class FeedbackOnCompanyService : IFeedbackOnCompanyService
    {
        private readonly AppDbContext _context;

        public FeedbackOnCompanyService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FeedBackOnCompany>> GetAllFeedbacksAsync()
        {
            return await _context.feedbackoncompany.ToListAsync();
        }

        public async Task<FeedBackOnCompany?> GetFeedbackByIdAsync(string id)
        {
            return await _context.feedbackoncompany.FindAsync(id);
        }

        public async Task<FeedBackOnCompany> CreateFeedbackAsync(FeedBackOnCompany feedback)
        {
            _context.feedbackoncompany.Add(feedback);
            await _context.SaveChangesAsync();
            return feedback;
        }

        public async Task<bool> UpdateFeedbackAsync(string id, FeedBackOnCompany feedback)
        {
            var existing = await _context.feedbackoncompany.FindAsync(id);
            if (existing == null)
                return false;

            _context.Entry(existing).CurrentValues.SetValues(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFeedbackAsync(string id)
        {
            var feedback = await _context.feedbackoncompany.FindAsync(id);
            if (feedback == null)
                return false;

            _context.feedbackoncompany.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

