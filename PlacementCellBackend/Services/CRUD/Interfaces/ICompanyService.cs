using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.CRUD.Interfaces
{
    public interface ICompanyService
    {
        Task<IEnumerable<Company>> GetAllCompaniesAsync();
        Task<Company?> GetCompanyByIdAsync(string id);
        Task<Company> CreateCompanyAsync(Company company);
        Task<bool> UpdateCompanyAsync(string id, Company company);
        Task<bool> DeleteCompanyAsync(string id);
        bool CompanyExists(string id);
    }
}

