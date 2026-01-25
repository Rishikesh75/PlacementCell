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
            var teacherIds = researchOpenings.Select(ro => ro.teacherid).Distinct().ToList();
            var teachers = await _context.teacher
                .Where(t => teacherIds.Contains(t.teacher_id))
                .ToDictionaryAsync(t => t.teacher_id, t => t.name);

            // Step 3: Map to DTOs
            var result = researchOpenings.Select(ro => new ResearchOpeningDto
            {
                teacherid = ro.teacherid,
                teachername = teachers.TryGetValue(ro.teacherid, out var teacherName)
                    ? teacherName : "Unknown",
                title = ro.title,
                description = ro.description,
                department = ro.department,
                researcharea = ro.researcharea,
                stipend = ro.stipend,
                duration = ro.duration,
                posteddate = ro.posteddate,
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
                .Where(t => t.teacher_id == researchOpening.teacherid)
                .Select(t => t.name)
                .FirstOrDefaultAsync() ?? "Unknown";

            return new ResearchOpeningDto
            {
                teacherid = researchOpening.teacherid,
                teachername = teacherName,
                title = researchOpening.title,
                description = researchOpening.description,
                department = researchOpening.department,
                researcharea = researchOpening.researcharea,
                stipend = researchOpening.stipend,
                duration = researchOpening.duration,
                posteddate = researchOpening.posteddate,
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
                teacherid = researchOpening.teacherid,
                title = researchOpening.title,
                description = researchOpening.description,
                department = researchOpening.department,
                researcharea = researchOpening.researcharea,
                stipend = researchOpening.stipend,
                duration = researchOpening.duration,
                posteddate = researchOpening.posteddate,
                deadline = researchOpening.deadline,
                Link = researchOpening.link,
                isactive = researchOpening.isactive
            };

            _context.teacherresearchopening.Add(model);
            await _context.SaveChangesAsync();

            // Get teacher name for response
            var teacherName = await _context.teacher
                .Where(t => t.teacher_id == researchOpening.teacherid)
                .Select(t => t.name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Return DTO with all info
            return new ResearchOpeningDto
            {
                teacherid = model.teacherid,
                teachername = teacherName,
                title = model.title,
                description = model.description,
                department = model.department,
                researcharea = model.researcharea,
                stipend = model.stipend,
                duration = model.duration,
                posteddate = model.posteddate,
                deadline = model.deadline,
                link = model.Link,
                isactive = model.isactive.ToString().ToLower()
            };
        }

        public async Task<bool> UpdateTeacherResearchOpeningAsync(int id, ResearchOpeningCreateDto researchOpening)
        {
            var existing = await _context.teacherresearchopening.FindAsync(id);
            if (existing == null)
                return false;

            // Update properties from DTO
            existing.teacherid = researchOpening.teacherid;
            existing.title = researchOpening.title;
            existing.description = researchOpening.description;
            existing.department = researchOpening.department;
            existing.researcharea = researchOpening.researcharea;
            existing.stipend = researchOpening.stipend;
            existing.duration = researchOpening.duration;
            existing.posteddate = researchOpening.posteddate;
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
