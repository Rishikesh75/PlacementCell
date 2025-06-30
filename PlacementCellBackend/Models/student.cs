using System.ComponentModel.DataAnnotations;
namespace PlacementCellBackend.Models
{
    public class Student
    {
        [Key]
        public string studentid { get; set; } = string.Empty; 
        public string name { get; set; } = string.Empty;
        public string major { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public long graduationyear { get; set; }
        public string phoneno { get; set; } = string.Empty;
    }
}
