using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Controllers.CRUD;

[ApiController]
[Route("api/[controller]")]
public class CollageController : ControllerBase
{
    private readonly ICollageService _collageService;

    public CollageController(ICollageService collageService)
    {
        _collageService = collageService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<College>>> GetAllColleges()
    {
        var colleges = await _collageService.GetAllCollegesAsync();
        return Ok(colleges);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<College>> GetCollegeById(int id)
    {
        var college = await _collageService.GetCollegeByIdAsync(id);
        if (college == null)
            return NotFound();
        return Ok(college);
    }
    
    
    [HttpPost]
    public async Task<ActionResult<College>> CreateCollege(College college)
    {
        var created = await _collageService.CreateCollegeAsync(college);
        return CreatedAtAction(nameof(GetCollegeById), new { id = created.Id }, created);
    }
    
    
    
}