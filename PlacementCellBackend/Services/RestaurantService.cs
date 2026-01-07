using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly AppDbContext _context;

        public RestaurantService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Restaurents>> GetAllRestaurantsAsync()
        {
            return await _context.restaurents.ToListAsync();
        }

        public async Task<Restaurents?> GetRestaurantByIdAsync(int id)
        {
            return await _context.restaurents.FindAsync(id);
        }

        public async Task<Restaurents> CreateRestaurantAsync(Restaurents restaurant)
        {
            _context.restaurents.Add(restaurant);
            await _context.SaveChangesAsync();
            return restaurant;
        }

        public async Task<bool> UpdateRestaurantAsync(int id, Restaurents restaurant)
        {
            var existing = await _context.restaurents.FindAsync(id);
            if (existing == null)
                return false;

            existing.name = restaurant.name;
            existing.contact = restaurant.contact;
            existing.address = restaurant.address;
            existing.rating = restaurant.rating;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteRestaurantAsync(int id)
        {
            var restaurant = await _context.restaurents.FindAsync(id);
            if (restaurant == null)
                return false;

            _context.restaurents.Remove(restaurant);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

