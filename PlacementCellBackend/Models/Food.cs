using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace PlacementCellBackend.Models
{
    public class Food
    {
        [Key]
        public int Id { get; set; }=0;
        [Required]
        public int restaurentId { get; set; } =0;
        [ForeignKey("restaurentId")]
        public Restaurents? Restaurent { get; set; }
        [Required]
        public string companyID { get; set; } = string.Empty;
        [ForeignKey("companyID")]
        public Company? Company { get; set; }
        public string Description { get; set; } = string.Empty;

        public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    }
}
