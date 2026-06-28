using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.AlumniJobOpenings;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;
using PlacementCellBackend.Models.Enums;
namespace PlacementCellBackend.Services.Placements
{
    public class AlumniPlacementService : IAlumniPlacementService
    {
        private readonly AppDbContext _context;

        public AlumniPlacementService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AlumniJobOpeningDto>> GetAllAlumniJobPostionAsync()
        {

            // Step 1: Query AlumniJobPostion table
            var jobs = await _context.alumnijobposition.ToListAsync();

            // Step 2: Get distinct company IDs
            var CompanyIds = jobs.Select(j => j.CompanyId).Distinct().ToList();

            // Step 3: Query Company table to get company names
            var companies = await _context.company
                .Where(c => CompanyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

            // Step 4: Map to DTO
            return jobs.Select(j => new AlumniJobOpeningDto
            {
                CompanyName = companies.TryGetValue(j.CompanyId, out var name) ? name : "Unknown",
                JobTitle = j.JobTitle,
                PostedDate = j.PostedDate.ToString("yyyy-MM-dd"),
                Package = j.Package,
                JobUrl = j.JobUrl,
                PostedByProfileUrl = j.PostedByProfileUrl
            });


        }

        public async Task<AlumniJobOpeningDto?> GetAlumniPlacementByIdAsync(int id)
        {
            // Step 1: Find the job by ID
            var job = await _context.alumnijobposition.FindAsync(id);

            // Step 2: Return null if not found
            if (job == null)
                return null;

            // Step 3: Query Company table to get the single company name
            var company = await _context.company
                .FirstOrDefaultAsync(c => c.CompanyId == job.CompanyId);

            // Step 4: Map to DTO and return
            return new AlumniJobOpeningDto
            {
                CompanyName = company?.CompanyName ?? "Unknown",
                JobTitle = job.JobTitle,
                PostedDate = job.PostedDate.ToString("yyyy-MM-dd"),
                Package = job.Package,
                JobUrl = job.JobUrl,
                PostedByProfileUrl = job.PostedByProfileUrl
            };

        }

        public async Task<bool> CreateAlumniPlacementAsync(AlumniJobOpeningCreateDto alumniPlacement)
        {
            var alumniPlacementEntity = new AlumniJobOpenings
            {
                CompanyId = alumniPlacement.CompanyId,
                JobTitle = alumniPlacement.JobTitle,
                PostedDate = DateOnly.Parse(alumniPlacement.PostedDate),
                Package = alumniPlacement.Package,
                JobUrl = alumniPlacement.JobUrl,
                PostedByProfileUrl = alumniPlacement.PostedByProfileUrl,
                PostedId = alumniPlacement.PostedId,
                PostedBy = alumniPlacement.PostedBy ?? PostedByType.Alumni
            };

            _context.alumnijobposition.Add(alumniPlacementEntity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpDateAlumniPlacementAsync(int id, AlumniJobOpeningCreateDto alumniPlacement)
        {
            var existing = await _context.alumnijobposition.FindAsync(id);
            if (existing == null)
                return false;

            existing.CompanyId = alumniPlacement.CompanyId;
            existing.JobTitle = alumniPlacement.JobTitle;
            existing.PostedDate = DateOnly.Parse(alumniPlacement.PostedDate);
            existing.Package = alumniPlacement.Package;
            existing.PostedBy = alumniPlacement.PostedBy ?? PostedByType.Alumni;

            _context.Entry(existing).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAlumniPlacementAsync(int id)
        {
            var alumniPlacement = await _context.alumnijobposition.FindAsync(id);
            if (alumniPlacement == null)
                return false;

            _context.alumnijobposition.Remove(alumniPlacement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

