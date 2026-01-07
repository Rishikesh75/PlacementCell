using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly AppDbContext _context;

        public TeacherService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Teacher>> GetAllTeachersAsync()
        {
            return await _context.teacher.ToListAsync();
        }

        public async Task<Teacher?> GetTeacherByIdAsync(string id)
        {
            return await _context.teacher.FindAsync(id);
        }

        public async Task<Teacher> CreateTeacherAsync(Teacher teacher)
        {
            _context.teacher.Add(teacher);
            await _context.SaveChangesAsync();
            return teacher;
        }

        public async Task<bool> UpdateTeacherAsync(string id, Teacher teacher)
        {
            if (!TeacherExists(id))
                return false;

            _context.Entry(teacher).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTeacherAsync(string id)
        {
            var teacher = await _context.teacher.FindAsync(id);
            if (teacher == null)
                return false;

            _context.teacher.Remove(teacher);
            await _context.SaveChangesAsync();
            return true;
        }

        public bool TeacherExists(string id)
        {
            return _context.teacher.Any(e => e.teacher_id == id);
        }
    }
}

