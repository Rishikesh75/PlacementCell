using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Interfaces
{
    public interface IRestaurantService
    {
        Task<IEnumerable<Restaurents>> GetAllRestaurantsAsync();
        Task<Restaurents?> GetRestaurantByIdAsync(int id);
        Task<Restaurents> CreateRestaurantAsync(Restaurents restaurant);
        Task<bool> UpdateRestaurantAsync(int id, Restaurents restaurant);
        Task<bool> DeleteRestaurantAsync(int id);
    }
}

