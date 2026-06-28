using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.ReasearchOpeningsDtos;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;

namespace PlacementCellBackend.Services.Placements
{
    public class TeacherPlacementService : ITeacherPlacementService
    {
        private readonly AppDbContext _context;

        public TeacherPlacementService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ResearchOpeningDto>> GetAllTeacherResearchOpeningsAsync()
        {
            // Step 1: Get all research openings
            var researchOpenings = await _context.teacherresearchopening.ToListAsync();

            if (!researchOpenings.Any())
            {
                return Enumerable.Empty<ResearchOpeningDto>();
            }

            // Step 2: Get unique teacher IDs and fetch teacher names
            var Ids = researchOpenings.Select(ro => ro.TeacherId).Distinct().ToList();
            var teachers = await _context.teacher
                .Where(t => Ids.Contains(t.Id))
                .ToDictionaryAsync(t => t.Id, t => t.Name);

            // Step 3: Map to DTOs
            var result = researchOpenings.Select(ro => new ResearchOpeningDto
            {
                Id = ro.TeacherId,
                teachername = teachers.TryGetValue(ro.TeacherId, out var teacherName)
                    ? teacherName : "Unknown",
                Title = ro.Title,
                Description = ro.Description,
                Department = ro.Department,
                Researcharea = ro.Researcharea,
                Stipend = ro.Stipend,
                Duration = ro.Duration,
                PostedDate = ro.PostedDate,
                DeadLine = ro.DeadLine,
                link = ro.Link,
                IsActive = ro.IsActive.ToString().ToLower()
            }).ToList();

            return result;
        }

        public async Task<ResearchOpeningDto?> GetTeacherResearchOpeningByIdAsync(int id)
        {
            var researchOpening = await _context.teacherresearchopening.FindAsync(id);

            if (researchOpening == null)
            {
                return null;
            }

            // Get teacher name
            var teacherName = await _context.teacher
                .Where(t => t.Id == researchOpening.TeacherId)
                .Select(t => t.Name)
                .FirstOrDefaultAsync() ?? "Unknown";

            return new ResearchOpeningDto
            {
                Id = researchOpening.TeacherId,
                teachername = teacherName,
                Title = researchOpening.Title,
                Description = researchOpening.Description,
                Department = researchOpening.Department,
                Researcharea = researchOpening.Researcharea,
                Stipend = researchOpening.Stipend,
                Duration = researchOpening.Duration,
                PostedDate = researchOpening.PostedDate,
                DeadLine = researchOpening.DeadLine,
                link = researchOpening.Link,
                IsActive = researchOpening.IsActive.ToString().ToLower()
            };
        }

        public async Task<ResearchOpeningDto> CreateTeacherResearchOpeningAsync(ResearchOpeningCreateDto researchOpening)
        {
            // Map DTO to Model
            var model = new ResearchOpening
            {
                Id = researchOpening.Id,
                Title = researchOpening.Title,
                Description = researchOpening.Description,
                Department = researchOpening.Department,
                Researcharea = researchOpening.Researcharea,
                Stipend = researchOpening.Stipend,
                Duration = researchOpening.Duration,
                PostedDate = researchOpening.PostedDate,
                DeadLine = researchOpening.DeadLine,
                Link = researchOpening.link,
                IsActive = researchOpening.IsActive
            };

            _context.teacherresearchopening.Add(model);
            await _context.SaveChangesAsync();

            // Get teacher name for response
            var teacherName = await _context.teacher
                .Where(t => t.Id == researchOpening.Id)
                .Select(t => t.Name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Return DTO with all info
            return new ResearchOpeningDto
            {
                Id = model.TeacherId,
                teachername = teacherName,
                Title = model.Title,
                Description = model.Description,
                Department = model.Department,
                Researcharea = model.Researcharea,
                Stipend = model.Stipend,
                Duration = model.Duration,
                PostedDate = model.PostedDate,
                DeadLine = model.DeadLine,
                link = model.Link,
                IsActive = model.IsActive.ToString().ToLower()
            };
        }

        public async Task<bool> UpDateTeacherResearchOpeningAsync(int id, ResearchOpeningCreateDto researchOpening)
        {
            var existing = await _context.teacherresearchopening.FindAsync(id);
            if (existing == null)
                return false;

            // UpDate properties from DTO
            existing.Id = researchOpening.Id;
            existing.Title = researchOpening.Title;
            existing.Description = researchOpening.Description;
            existing.Department = researchOpening.Department;
            existing.Researcharea = researchOpening.Researcharea;
            existing.Stipend = researchOpening.Stipend;
            existing.Duration = researchOpening.Duration;
            existing.PostedDate = researchOpening.PostedDate;
            existing.DeadLine = researchOpening.DeadLine;
            existing.Link = researchOpening.link;
            existing.IsActive = researchOpening.IsActive;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTeacherResearchOpeningAsync(int id)
        {
            var researchOpening = await _context.teacherresearchopening.FindAsync(id);
            if (researchOpening == null)
                return false;

            _context.teacherresearchopening.Remove(researchOpening);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
