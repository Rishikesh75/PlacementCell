using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.AlumniJobOpenings;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;

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
            var companyIds = jobs.Select(j => j.companyid).Distinct().ToList();

            // Step 3: Query Company table to get company names
            var companies = await _context.company
                .Where(c => companyIds.Contains(c.company_id))
                .ToDictionaryAsync(c => c.company_id, c => c.company_name);

            // Step 4: Map to DTO
            return jobs.Select(j => new AlumniJobOpeningDto
            {
                CompanyName = companies.TryGetValue(j.companyid, out var name) ? name : "Unknown",
                JobTitle = j.jobtitle,
                posteddate = j.posteddate.ToString("yyyy-MM-dd"),
                package = j.package,
                JobUrl = j.JobUrl,
                PostedByProfileUrl = j.postedByProfileUrl
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
                .FirstOrDefaultAsync(c => c.company_id == job.companyid);

            // Step 4: Map to DTO and return
            return new AlumniJobOpeningDto
            {
                CompanyName = company?.company_name ?? "Unknown",
                JobTitle = job.jobtitle,
                posteddate = job.posteddate.ToString("yyyy-MM-dd"),
                package = job.package,
                JobUrl = job.JobUrl,
                PostedByProfileUrl = job.postedByProfileUrl
            };

        }

        public async Task<bool> CreateAlumniPlacementAsync(AlumniJobOpeningCreateDto alumniPlacement)
        {
            var alumniPlacementEntity = new AlumniJobOpenings
            {
                companyid = alumniPlacement.Companyid,
                jobtitle = alumniPlacement.Jobtitle,
                posteddate = DateOnly.Parse(alumniPlacement.Posteddate),
                package = alumniPlacement.Package,
                JobUrl = alumniPlacement.JobUrl,
                postedByProfileUrl = alumniPlacement.PostedByProfileUrl,
                postedbyid = alumniPlacement.Postedbyid,
                postedby = alumniPlacement.Postedby ?? PostedByType.Alumni
            };

            _context.alumnijobposition.Add(alumniPlacementEntity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAlumniPlacementAsync(int id, AlumniJobOpeningCreateDto alumniPlacement)
        {
            var existing = await _context.alumnijobposition.FindAsync(id);
            if (existing == null)
                return false;

            existing.companyid = alumniPlacement.Companyid;
            existing.jobtitle = alumniPlacement.Jobtitle;
            existing.posteddate = DateOnly.Parse(alumniPlacement.Posteddate);
            existing.package = alumniPlacement.Package;
            existing.postedby = alumniPlacement.Postedby ?? PostedByType.Alumni;

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

