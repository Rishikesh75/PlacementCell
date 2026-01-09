using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
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

        public async Task<IEnumerable<AlumniJobPosition>> GetAllAlumniJobPositionAsync()
        {
            return await _context.alumnijobposition.ToListAsync();
        }

        public async Task<AlumniJobPosition?> GetAlumniPlacementByIdAsync(int id)
        {
            return await _context.alumnijobposition.FindAsync(id);
        }

        public async Task<AlumniJobPosition> CreateAlumniPlacementAsync(AlumniJobPosition alumniPlacement)
        {
            _context.alumnijobposition.Add(alumniPlacement);
            await _context.SaveChangesAsync();
            return alumniPlacement;
        }

        public async Task<bool> UpdateAlumniPlacementAsync(int id, AlumniJobPosition alumniPlacement)
        {
            var existing = await _context.alumnijobposition.FindAsync(id);
            if (existing == null)
                return false;

            existing.companyid = alumniPlacement.companyid;
            existing.jobtitle = alumniPlacement.jobtitle;
            existing.posteddate = alumniPlacement.posteddate;
            existing.package = alumniPlacement.package;
            existing.postedbytype = alumniPlacement.postedbytype;
            existing.postedbyalumniid = alumniPlacement.postedbyalumniid;
            existing.postedbyemployeeid = alumniPlacement.postedbyemployeeid;

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

