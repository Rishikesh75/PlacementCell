using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.DTOs.AlumniDtos;
using PlacementCellBackend.Services.CRUD.Interfaces;
using AlumniModel = PlacementCellBackend.Models.Alumni;
namespace PlacementCellBackend.Controllers.CRUD;

[ApiController]
[Route("api/[controller]")]
public class AlumniController : ControllerBase
{
    private readonly IAlumniService _alumniService;

    public AlumniController(IAlumniService alumniService)
    {
        _alumniService = alumniService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlumniDto>>> GetAlumniList()
    {
        var alumni = await _alumniService.GetAllAlumniAsync();
        return Ok(alumni);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AlumniDto>> GetAlumni(string id)
    {
        var alumni = await _alumniService.GetAlumniByIdWithCompanyAsync(id);
        if (alumni == null)
            return NotFound();
        return Ok(alumni);
    }

    [HttpPost]
    public async Task<ActionResult<AlumniModel>> PostAlumni(AlumniDtoCreate alumni)
    {
        var alumniModel = new Models.Alumni
        {
            Id = alumni.Id,
            Position = alumni.Position,
            Linkdinprofile = alumni.LinkedInProfile,
            CompanyId = alumni.CompanyId,
            Name = alumni.Name
        };

        var created = await _alumniService.CreateAlumniAsync(alumniModel);
        return CreatedAtAction(nameof(GetAlumni), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAlumni(string id, AlumniDtoUpDate upDatedAlumni)
    {

        var success = await _alumniService.UpDateAlumniAsync(id, upDatedAlumni);
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlumni(string id)
    {
        var success = await _alumniService.DeleteAlumniAsync(id);
        if (!success)
            return NotFound();

        return NoContent();
    }
}
