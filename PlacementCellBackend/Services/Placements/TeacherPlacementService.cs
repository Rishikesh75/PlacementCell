using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
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

        public async Task<IEnumerable<TeacherResearchOpening>> GetAllTeacherResearchOpeningsAsync()
        {
            return await _context.teacherresearchopening.ToListAsync();
        }

        public async Task<TeacherResearchOpening?> GetTeacherResearchOpeningByIdAsync(int id)
        {
            return await _context.teacherresearchopening.FindAsync(id);
        }

        public async Task<TeacherResearchOpening> CreateTeacherResearchOpeningAsync(TeacherResearchOpening researchOpening)
        {
            _context.teacherresearchopening.Add(researchOpening);
            await _context.SaveChangesAsync();
            return researchOpening;
        }

        public async Task<bool> UpdateTeacherResearchOpeningAsync(int id, TeacherResearchOpening researchOpening)
        {
            var existing = await _context.teacherresearchopening.FindAsync(id);
            if (existing == null)
                return false;

            existing.teacherid = researchOpening.teacherid;
            existing.title = researchOpening.title;
            existing.description = researchOpening.description;
            existing.department = researchOpening.department;
            existing.researcharea = researchOpening.researcharea;
            existing.stipend = researchOpening.stipend;
            existing.duration = researchOpening.duration;
            existing.posteddate = researchOpening.posteddate;
            existing.deadline = researchOpening.deadline;
            existing.isactive = researchOpening.isactive;

            _context.Entry(existing).State = EntityState.Modified;
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
