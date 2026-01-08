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

        public async Task<IEnumerable<AlumniFeedBackonCompany>> GetAllFeedbacksAsync()
        {
            return await _context.alumnifeedbackoncompany.ToListAsync();
        }

        public async Task<AlumniFeedBackonCompany?> GetFeedbackByIdAsync(string id)
        {
            return await _context.alumnifeedbackoncompany.FindAsync(id);
        }

        public async Task<AlumniFeedBackonCompany> CreateFeedbackAsync(AlumniFeedBackonCompany feedback)
        {
            _context.alumnifeedbackoncompany.Add(feedback);
            await _context.SaveChangesAsync();
            return feedback;
        }

        public async Task<bool> UpdateFeedbackAsync(string id, AlumniFeedBackonCompany feedback)
        {
            var existing = await _context.alumnifeedbackoncompany.FindAsync(id);
            if (existing == null)
                return false;

            _context.Entry(existing).CurrentValues.SetValues(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFeedbackAsync(string id)
        {
            var feedback = await _context.alumnifeedbackoncompany.FindAsync(id);
            if (feedback == null)
                return false;

            _context.alumnifeedbackoncompany.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

