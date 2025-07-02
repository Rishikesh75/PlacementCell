using System.ComponentModel.DataAnnotations;

namespace PlacementCellBackend.Models
{
    public class Restaurents
    {
        [Key]
        public int restaurentid { get; set; } = 0;
        public string name { get; set; } = string.Empty;
        public string contact { get; set; } = string.Empty; 

        public string address { get; set; } = string.Empty;

        public string rating { get; set; } = string.Empty;


    }
}
