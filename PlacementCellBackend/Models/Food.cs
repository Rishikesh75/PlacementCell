using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace PlacementCellBackend.Models
{
    public class Food
    {
        [Key]
        public int id { get; set; }=0;
        [Required]
        public int restaurentid { get; set; } =0;
        [ForeignKey("restaurentid")]
        public Restaurents? Restaurent { get; set; }
        [Required]
        public string companyid { get; set; } = string.Empty;
        [ForeignKey("companyid")]
        public Company? Company { get; set; }
        public string description { get; set; } = string.Empty;

        public DateOnly date { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    }
}
