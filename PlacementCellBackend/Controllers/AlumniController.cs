using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Controllers
{
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
        public async Task<ActionResult<IEnumerable<Alumni>>> GetAlumniList()
        {
            var alumni = await _alumniService.GetAllAlumniAsync();
            return Ok(alumni);
        }

        [HttpPost]
        public async Task<ActionResult<Alumni>> PostAlumni(Alumni alumni)
        {
            var created = await _alumniService.CreateAlumniAsync(alumni);
            return CreatedAtAction(nameof(GetAlumni), new { id = created.alumniid }, created);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Alumni>> GetAlumni(string id)
        {
            var alumni = await _alumniService.GetAlumniByIdAsync(id);
            if (alumni == null)
                return NotFound();
            return Ok(alumni);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlumni(string id, Alumni updatedAlumni)
        {
            if (id != updatedAlumni.alumniid)
                return BadRequest();

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
}
