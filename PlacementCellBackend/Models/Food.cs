namespace PlacementCellBackend.Models
{
    public class Food
    {

        public string restaurentId { get; set; } = string.Empty;
        public string companyID { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    }
}
