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

        public async Task<IEnumerable<AlumniPlacements>> GetAllAlumniPlacementsAsync()
        {
            return await _context.alumniplacements.ToListAsync();
        }

        public async Task<AlumniPlacements?> GetAlumniPlacementByIdAsync(int id)
        {
            return await _context.alumniplacements.FindAsync(id);
        }

        public async Task<AlumniPlacements> CreateAlumniPlacementAsync(AlumniPlacements alumniPlacement)
        {
            _context.alumniplacements.Add(alumniPlacement);
            await _context.SaveChangesAsync();
            return alumniPlacement;
        }

        public async Task<bool> UpdateAlumniPlacementAsync(int id, AlumniPlacements alumniPlacement)
        {
            var existing = await _context.alumniplacements.FindAsync(id);
            if (existing == null)
                return false;

            existing.alumniid = alumniPlacement.alumniid;
            existing.companyid = alumniPlacement.companyid;
            existing.jobtitle = alumniPlacement.jobtitle;
            existing.placementdate = alumniPlacement.placementdate;
            existing.package = alumniPlacement.package;

            _context.Entry(existing).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAlumniPlacementAsync(int id)
        {
            var alumniPlacement = await _context.alumniplacements.FindAsync(id);
            if (alumniPlacement == null)
                return false;

            _context.alumniplacements.Remove(alumniPlacement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

