using System.ComponentModel.DataAnnotations;

namespace PlacementCellBackend.Models
{
    public class Restaurents
    {
        [Key]
        public int Id { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public string Contact { get; set; } = string.Empty; 

        public string Address { get; set; } = string.Empty;

        public string Rating { get; set; } = string.Empty;


    }
}
