using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.AlumniDtos;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Services.CRUD;

public class AlumniService : IAlumniService
{
    private readonly AppDbContext _context;

    public AlumniService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<AlumniDto>> GetAllAlumniAsync()
    {
        // Step 1: Query Alumni table
        var alumni = await _context.alumni.ToListAsync();

        // Step 2: Get distinct company IDs
        var CompanyIds = alumni.Select(a => a.CompanyId).Distinct().ToList();

        // Step 3: Query Company table to get company names
        var companies = await _context.company
            .Where(c => CompanyIds.Contains(c.CompanyId))
            .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

        // Step 4: Map to DTO with company name
        return alumni.Select(a => new AlumniDto
        {
            Id = a.Id,
            Name = a.Name,
            Position = a.Position,
            LinkedInProfile = a.Linkdinprofile,
            CompanyId = a.CompanyId,
            CompanyName = companies.TryGetValue(a.CompanyId, out var name) ? name : "Unknown"
        });
    }

    public async Task<AlumniDto?> GetAlumniByIdWithCompanyAsync(string id)
    {
        // Step 1: Query Alumni table
        var alumni = await _context.alumni.FindAsync(id);
        if (alumni == null)
            return null;

        // Step 2: Query Company table to get company name
        var company = await _context.company
            .FirstOrDefaultAsync(c => c.CompanyId == alumni.CompanyId);

        // Step 3: Map to DTO
        return new AlumniDto
        {
            Id = alumni.Id,
            Position = alumni.Position,
            LinkedInProfile = alumni.Linkdinprofile,
            CompanyId = alumni.CompanyId,
            CompanyName = company?.CompanyName ?? "Unknown"
        };
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

    public async Task<bool> UpDateAlumniAsync(string id, AlumniDtoUpDate alumni)
    {

        var existingAlumni = await _context.alumni.FindAsync(id);
        if (existingAlumni == null)
            return false;


        existingAlumni.Position = alumni.Position;
        existingAlumni.Linkdinprofile = alumni.LinkedInProfile;
        existingAlumni.CompanyId = alumni.CompanyId;
        existingAlumni.Name = alumni.Name;

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
        return _context.alumni.Any(e => e.Id == id);
    }
}
