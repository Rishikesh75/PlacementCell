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
            var Ids = placements.Select(p => p.StudentId).Distinct().ToList();
            var students = await _context.student
                .Where(s => Ids.Contains(s.Id))
                .ToDictionaryAsync(s => s.Id, s => s.Name);

            // Step 3: Get unique company IDs and fetch company names
            var CompanyIds = placements.Select(p => p.CompanyId).Distinct().ToList();
            var companies = await _context.company
                .Where(c => CompanyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

            // Step 4: Map to DTOs
            var result = placements.Select(p => new PlacementDTO
            {
                Id = p.StudentId,
                StudentName = students.TryGetValue(p.StudentId, out var studentName)
                    ? studentName : "Unknown",
                CompanyId = p.CompanyId,
                CompanyName = companies.TryGetValue(p.CompanyId, out var companyName)
                    ? companyName : "Unknown",
                JobTitle = p.JobTitle,
                PlacementDate = p.PlacementDate,
                Package = p.Package
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
                .Where(s => s.Id == placement.StudentId)
                .Select(s => s.Name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Get company name
            var companyName = await _context.company
                .Where(c => c.CompanyId == placement.CompanyId)
                .Select(c => c.CompanyName)
                .FirstOrDefaultAsync() ?? "Unknown";

            return new PlacementDTO
            {
                Id = placement.StudentId,
                StudentName = studentName,
                CompanyId = placement.CompanyId,
                CompanyName = companyName,
                JobTitle = placement.JobTitle,
                PlacementDate = placement.PlacementDate,
                Package = placement.Package
            };
        }

        public async Task<PlacementDTO> CreatePlacementAsync(CreatePlacementDTO placement)
        {
            // Map DTO to Model
            var placementModel = new Placement
            {
                StudentId = placement.Id,
                CompanyId = placement.CompanyId,
                JobTitle = placement.JobTitle,
                PlacementDate = placement.PlacementDate,
                Package = placement.Package
            };

            _context.placement.Add(placementModel);
            await _context.SaveChangesAsync();

            // Get student name for response
            var studentName = await _context.student
                .Where(s => s.Id == placement.Id)
                .Select(s => s.Name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Get company name for response
            var companyName = await _context.company
                .Where(c => c.CompanyId == placement.CompanyId)
                .Select(c => c.CompanyName)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Return DTO with all info
            return new PlacementDTO
            {
                Id = placementModel.StudentId,
                StudentName = studentName,
                CompanyId = placementModel.CompanyId,
                CompanyName = companyName,
                JobTitle = placementModel.JobTitle,
                PlacementDate = placementModel.PlacementDate,
                Package = placementModel.Package
            };
        }

        public async Task<bool> UpDatePlacementAsync(int id, CreatePlacementDTO placement)
        {
            var existing = await _context.placement.FindAsync(id);
            if (existing == null)
                return false;

            // UpDate properties from DTO
            existing.StudentId = placement.Id;
            existing.CompanyId = placement.CompanyId;
            existing.JobTitle = placement.JobTitle;
            existing.PlacementDate = placement.PlacementDate;
            existing.Package = placement.Package;

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

