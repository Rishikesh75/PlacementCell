using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class TeacherPlacementService : ITeacherPlacementService
    {
        private readonly AppDbContext _context;

        public TeacherPlacementService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TeacherPlacements>> GetAllTeacherPlacementsAsync()
        {
            return await _context.teacherplacements.ToListAsync();
        }

        public async Task<TeacherPlacements?> GetTeacherPlacementByIdAsync(int id)
        {
            return await _context.teacherplacements.FindAsync(id);
        }

        public async Task<TeacherPlacements> CreateTeacherPlacementAsync(TeacherPlacements teacherPlacement)
        {
            _context.teacherplacements.Add(teacherPlacement);
            await _context.SaveChangesAsync();
            return teacherPlacement;
        }

        public async Task<bool> UpdateTeacherPlacementAsync(int id, TeacherPlacements teacherPlacement)
        {
            var existing = await _context.teacherplacements.FindAsync(id);
            if (existing == null)
                return false;

            existing.teacherid = teacherPlacement.teacherid;
            existing.companyid = teacherPlacement.companyid;
            existing.employeeemail = teacherPlacement.employeeemail;

            _context.Entry(existing).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTeacherPlacementAsync(int id)
        {
            var teacherPlacement = await _context.teacherplacements.FindAsync(id);
            if (teacherPlacement == null)
                return false;

            _context.teacherplacements.Remove(teacherPlacement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

