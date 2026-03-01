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
            var Ids = researchOpenings.Select(ro => ro.Id).Distinct().ToList();
            var teachers = await _context.teacher
                .Where(t => Ids.Contains(t.Id))
                .ToDictionaryAsync(t => t.Id, t => t.Name);

            // Step 3: Map to DTOs
            var result = researchOpenings.Select(ro => new ResearchOpeningDto
            {
                Id = ro.Id,
                teachername = teachers.TryGetValue(ro.Id, out var teacherName)
                    ? teacherName : "Unknown",
                title = ro.title,
                Description = ro.Description,
                department = ro.department,
                researcharea = ro.researcharea,
                stipend = ro.stipend,
                duration = ro.duration,
                postedDate = ro.postedDate,
                deadline = ro.deadline,
                link = ro.Link,
                isactive = ro.isactive.ToString().ToLower()
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
                .Where(t => t.Id == researchOpening.Id)
                .Select(t => t.Name)
                .FirstOrDefaultAsync() ?? "Unknown";

            return new ResearchOpeningDto
            {
                Id = researchOpening.Id,
                teachername = teacherName,
                title = researchOpening.title,
                Description = researchOpening.Description,
                department = researchOpening.department,
                researcharea = researchOpening.researcharea,
                stipend = researchOpening.stipend,
                duration = researchOpening.duration,
                postedDate = researchOpening.postedDate,
                deadline = researchOpening.deadline,
                link = researchOpening.Link,
                isactive = researchOpening.isactive.ToString().ToLower()
            };
        }

        public async Task<ResearchOpeningDto> CreateTeacherResearchOpeningAsync(ResearchOpeningCreateDto researchOpening)
        {
            // Map DTO to Model
            var model = new ResearchOpening
            {
                Id = researchOpening.Id,
                title = researchOpening.title,
                Description = researchOpening.Description,
                department = researchOpening.department,
                researcharea = researchOpening.researcharea,
                stipend = researchOpening.stipend,
                duration = researchOpening.duration,
                postedDate = researchOpening.postedDate,
                deadline = researchOpening.deadline,
                Link = researchOpening.link,
                isactive = researchOpening.isactive
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
                Id = model.Id,
                teachername = teacherName,
                title = model.title,
                Description = model.Description,
                department = model.department,
                researcharea = model.researcharea,
                stipend = model.stipend,
                duration = model.duration,
                postedDate = model.postedDate,
                deadline = model.deadline,
                link = model.Link,
                isactive = model.isactive.ToString().ToLower()
            };
        }

        public async Task<bool> UpDateTeacherResearchOpeningAsync(int id, ResearchOpeningCreateDto researchOpening)
        {
            var existing = await _context.teacherresearchopening.FindAsync(id);
            if (existing == null)
                return false;

            // UpDate properties from DTO
            existing.Id = researchOpening.Id;
            existing.title = researchOpening.title;
            existing.Description = researchOpening.Description;
            existing.department = researchOpening.department;
            existing.researcharea = researchOpening.researcharea;
            existing.stipend = researchOpening.stipend;
            existing.duration = researchOpening.duration;
            existing.postedDate = researchOpening.postedDate;
            existing.deadline = researchOpening.deadline;
            existing.Link = researchOpening.link;
            existing.isactive = researchOpening.isactive;

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
