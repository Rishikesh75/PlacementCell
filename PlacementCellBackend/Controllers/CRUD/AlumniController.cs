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
            alumniid = alumni.AlumniId,
            position = alumni.Position,
            linkdinprofile = alumni.LinkedInProfile,
            companyid = alumni.CompanyId,
            name = alumni.Name
        };

        var created = await _alumniService.CreateAlumniAsync(alumniModel);
        return CreatedAtAction(nameof(GetAlumni), new { id = created.alumniid }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAlumni(string id, AlumniDtoUpdate updatedAlumni)
    {

        var success = await _alumniService.UpdateAlumniAsync(id, updatedAlumni);
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
