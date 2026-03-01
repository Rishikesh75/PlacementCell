using System.ComponentModel.DataAnnotations;

namespace PlacementCellBackend.Models
{
    public class Company
    {
        [Key]
        public string CompanyId { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;

        public string Industry { get; set; } = string.Empty;
    }

}
