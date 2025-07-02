using System.ComponentModel.DataAnnotations;

namespace PlacementCellBackend.Models
{
    public class Company
    {
        [Key]
        public string company_id { get; set; } = string.Empty;
        public string company_name { get; set; } = string.Empty;

        public string industry { get; set; } = string.Empty;
    }

}
