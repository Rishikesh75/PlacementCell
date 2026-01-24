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
        var companyIds = alumni.Select(a => a.companyid).Distinct().ToList();

        // Step 3: Query Company table to get company names
        var companies = await _context.company
            .Where(c => companyIds.Contains(c.company_id))
            .ToDictionaryAsync(c => c.company_id, c => c.company_name);

        // Step 4: Map to DTO with company name
        return alumni.Select(a => new AlumniDto
        {
            AlumniId = a.alumniid,
            Name = a.name,
            Position = a.position,
            LinkedInProfile = a.linkdinprofile,
            CompanyId = a.companyid,
            CompanyName = companies.TryGetValue(a.companyid, out var name) ? name : "Unknown"
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
            .FirstOrDefaultAsync(c => c.company_id == alumni.companyid);

        // Step 3: Map to DTO
        return new AlumniDto
        {
            AlumniId = alumni.alumniid,
            Position = alumni.position,
            LinkedInProfile = alumni.linkdinprofile,
            CompanyId = alumni.companyid,
            CompanyName = company?.company_name ?? "Unknown"
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

    public async Task<bool> UpdateAlumniAsync(string id, AlumniDtoUpdate alumni)
    {

        var existingAlumni = await _context.alumni.FindAsync(id);
        if (existingAlumni == null)
            return false;


        existingAlumni.position = alumni.Position;
        existingAlumni.linkdinprofile = alumni.LinkedInProfile;
        existingAlumni.companyid = alumni.CompanyId;
        existingAlumni.name = alumni.Name;

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
