using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class feedbackoncompanyController : Controller
{
    private readonly AppDbContext _context;

    public feedbackoncompanyController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.FeedBackOnCompany>>> GetFeedbackOnCompany()
    {
        return await _context.feedbackoncompany.ToListAsync();
    }
    [HttpPost]
    public async Task<ActionResult<Models.FeedBackOnCompany>> PostFeedbackOnCompany(FeedBackOnCompany feedback)
    {
        Console.WriteLine(feedback);
        _context.feedbackoncompany.Add(feedback);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetFeedbackOnCompany), new { id = feedback.feedbackid }, feedback);
    }
}
