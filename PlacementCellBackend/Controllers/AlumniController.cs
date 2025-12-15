using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AlumniController : Controller
{
    private readonly AppDbContext _context;

    public AlumniController(AppDbContext context)
    {
        _context = context;
    }
    // GET: api/alumni
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Alumni>>> GetAlumniList()
    {
        return await _context.alumni.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Alumni>> PostAlumni(Alumni alumni)
    {
        _context.alumni.Add(alumni);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAlumni), new { id = alumni.alumniid }, alumni);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Alumni>> GetAlumni(string id)
    {
        var alumni = await _context.alumni.FindAsync(id);
        if (alumni == null)
        {
            return NotFound();
        }
        return alumni;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAlumni(string id, Alumni updatedAlumni)
    {
        if (id != updatedAlumni.alumniid)
        {
            return BadRequest();
        }
        _context.Entry(updatedAlumni).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AlumniExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }


    private bool AlumniExists(string id)
    {
        return _context.alumni.Any(e => e.alumniid == id);
    }
    // DELETE: api/alumni/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlumni(string id)
    {
        var alumni = await _context.alumni.FindAsync(id);
        if (alumni == null)
        {
            return NotFound();
        }
        _context.alumni.Remove(alumni);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
