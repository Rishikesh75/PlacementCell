using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class AlumniService : IAlumniService
    {
        private readonly AppDbContext _context;

        public AlumniService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Alumni>> GetAllAlumniAsync()
        {
            return await _context.alumni.ToListAsync();
        }

        public async Task<Alumni?> GetAlumniByIdAsync(string id)
        {
            return await _context.alumni.FindAsync(id);
        }

        public async Task<Alumni> CreateAlumniAsync(Alumni alumni)
        {
            _context.alumni.Add(alumni);
            await _context.SaveChangesAsync();
            return alumni;
        }

        public async Task<bool> UpdateAlumniAsync(string id, Alumni alumni)
        {
            if (!AlumniExists(id))
                return false;

            _context.Entry(alumni).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAlumniAsync(string id)
        {
            var alumni = await _context.alumni.FindAsync(id);
            if (alumni == null)
                return false;

            _context.alumni.Remove(alumni);
            await _context.SaveChangesAsync();
            return true;
        }

        public bool AlumniExists(string id)
        {
            return _context.alumni.Any(e => e.alumniid == id);
        }
    }
}

