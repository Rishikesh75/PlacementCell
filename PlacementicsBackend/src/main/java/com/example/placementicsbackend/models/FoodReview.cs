using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PlacementCellBackend.Models;


public class FoodReview
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; } = 0;
    [Required]
    public int RestaurentId { get; set; } = 0;
    [ForeignKey("Id")]
    public Restaurents? Restaurent { get; set; }
    [Required]
    public string CompanyId { get; set; } = string.Empty;
    [ForeignKey("companyid")]
    public Company? Company { get; set; }
    public string Description { get; set; } = string.Empty;

    public int Rating { get; set; }

    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);

}

