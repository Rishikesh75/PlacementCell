namespace PlacementCellBackend.DTOs.FoodReview;

public class FoodReviewDtos
{
    public int Id { get; set; }
    public string RestaurentName { get; set; } = string.Empty;
    public int RestaurentId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string CompanyId { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Rating { get; set; }
    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);
}

public class FoodReviewCreateDtos
{
    public int restaurentid { get; set; } = 0;
    public string companyid { get; set; } = string.Empty;
    public string description { get; set; } = string.Empty;
    public int rating { get; set; }
    public DateOnly date { get; set; } = DateOnly.FromDateTime(DateTime.Now);
}
