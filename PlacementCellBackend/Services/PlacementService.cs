using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class PlacementService : IPlacementService
    {
        private readonly AppDbContext _context;

        public PlacementService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Placement>> GetAllPlacementsAsync()
        {
            return await _context.placement.ToListAsync();
        }

        public async Task<Placement?> GetPlacementByIdAsync(int id)
        {
            return await _context.placement.FindAsync(id);
        }

        public async Task<Placement> CreatePlacementAsync(Placement placement)
        {
            _context.placement.Add(placement);
            await _context.SaveChangesAsync();
            return placement;
        }

        public async Task<bool> UpdatePlacementAsync(int id, Placement placement)
        {
            var existing = await _context.placement.FindAsync(id);
            if (existing == null)
                return false;

            existing.studentid = placement.studentid;
            existing.companyid = placement.companyid;
            existing.jobtitle = placement.jobtitle;
            existing.placementdate = placement.placementdate;
            existing.package = placement.package;

            _context.Entry(existing).State = EntityState.Modified;
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

