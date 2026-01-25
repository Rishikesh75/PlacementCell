using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.PlacementDTOs;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;

namespace PlacementCellBackend.Services.Placements
{
    public class PlacementService : IPlacementService
    {
        private readonly AppDbContext _context;

        public PlacementService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PlacementDTO>> GetAllPlacementsAsync()
        {
            // Step 1: Get all placements
            var placements = await _context.placement.ToListAsync();

            if (!placements.Any())
            {
                return Enumerable.Empty<PlacementDTO>();
            }

            // Step 2: Get unique student IDs and fetch student names
            var studentIds = placements.Select(p => p.studentid).Distinct().ToList();
            var students = await _context.student
                .Where(s => studentIds.Contains(s.studentid))
                .ToDictionaryAsync(s => s.studentid, s => s.name);

            // Step 3: Get unique company IDs and fetch company names
            var companyIds = placements.Select(p => p.companyid).Distinct().ToList();
            var companies = await _context.company
                .Where(c => companyIds.Contains(c.company_id))
                .ToDictionaryAsync(c => c.company_id, c => c.company_name);

            // Step 4: Map to DTOs
            var result = placements.Select(p => new PlacementDTO
            {
                StudentId = p.studentid,
                StudentName = students.TryGetValue(p.studentid, out var studentName)
                    ? studentName : "Unknown",
                CompanyId = p.companyid,
                CompanyName = companies.TryGetValue(p.companyid, out var companyName)
                    ? companyName : "Unknown",
                JobTitle = p.jobtitle,
                PlacementDate = p.placementdate,
                Package = p.package
            }).ToList();

            return result;
        }

        public async Task<PlacementDTO?> GetPlacementByIdAsync(int id)
        {
            var placement = await _context.placement.FindAsync(id);

            if (placement == null)
            {
                return null;
            }

            // Get student name
            var studentName = await _context.student
                .Where(s => s.studentid == placement.studentid)
                .Select(s => s.name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Get company name
            var companyName = await _context.company
                .Where(c => c.company_id == placement.companyid)
                .Select(c => c.company_name)
                .FirstOrDefaultAsync() ?? "Unknown";

            return new PlacementDTO
            {
                StudentId = placement.studentid,
                StudentName = studentName,
                CompanyId = placement.companyid,
                CompanyName = companyName,
                JobTitle = placement.jobtitle,
                PlacementDate = placement.placementdate,
                Package = placement.package
            };
        }

        public async Task<PlacementDTO> CreatePlacementAsync(CreatePlacementDTO placement)
        {
            // Map DTO to Model
            var placementModel = new Placement
            {
                studentid = placement.StudentId,
                companyid = placement.CompanyId,
                jobtitle = placement.JobTitle,
                placementdate = placement.PlacementDate,
                package = placement.Package
            };

            _context.placement.Add(placementModel);
            await _context.SaveChangesAsync();

            // Get student name for response
            var studentName = await _context.student
                .Where(s => s.studentid == placement.StudentId)
                .Select(s => s.name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Get company name for response
            var companyName = await _context.company
                .Where(c => c.company_id == placement.CompanyId)
                .Select(c => c.company_name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Return DTO with all info
            return new PlacementDTO
            {
                StudentId = placementModel.studentid,
                StudentName = studentName,
                CompanyId = placementModel.companyid,
                CompanyName = companyName,
                JobTitle = placementModel.jobtitle,
                PlacementDate = placementModel.placementdate,
                Package = placementModel.package
            };
        }

        public async Task<bool> UpdatePlacementAsync(int id, CreatePlacementDTO placement)
        {
            var existing = await _context.placement.FindAsync(id);
            if (existing == null)
                return false;

            // Update properties from DTO
            existing.studentid = placement.StudentId;
            existing.companyid = placement.CompanyId;
            existing.jobtitle = placement.JobTitle;
            existing.placementdate = placement.PlacementDate;
            existing.package = placement.Package;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePlacementAsync(int id)
        {
            var placement = await _context.placement.FindAsync(id);
            if (placement == null)
                return false;

            _context.placement.Remove(placement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

