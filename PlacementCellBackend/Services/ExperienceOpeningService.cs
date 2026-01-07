using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class ExperienceOpeningService : IExperienceOpeningService
    {
        private readonly AppDbContext _context;

        public ExperienceOpeningService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExperienceOpening>> GetAllExperienceOpeningsAsync()
        {
            return await _context.experienceopening.ToListAsync();
        }

        public async Task<ExperienceOpening?> GetExperienceOpeningByIdAsync(int id)
        {
            return await _context.experienceopening.FindAsync(id);
        }

        public async Task<ExperienceOpening> CreateExperienceOpeningAsync(ExperienceOpening experienceOpening)
        {
            _context.experienceopening.Add(experienceOpening);
            await _context.SaveChangesAsync();
            return experienceOpening;
        }

        public async Task<bool> UpdateExperienceOpeningAsync(int id, ExperienceOpening experienceOpening)
        {
            var existing = await _context.experienceopening.FindAsync(id);
            if (existing == null)
                return false;

            existing.companyid = experienceOpening.companyid;
            existing.jobid = experienceOpening.jobid;
            existing.jobtitle = experienceOpening.jobtitle;
            existing.experiencerequired = experienceOpening.experiencerequired;
            existing.companyempemail = experienceOpening.companyempemail;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteExperienceOpeningAsync(int id)
        {
            var experienceOpening = await _context.experienceopening.FindAsync(id);
            if (experienceOpening == null)
                return false;

            _context.experienceopening.Remove(experienceOpening);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

