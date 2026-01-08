using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.CRUD.Interfaces
{
    public interface ICompanyEmployeeService
    {
        Task<IEnumerable<Companyemployee>> GetAllCompanyEmployeesAsync();
        Task<Companyemployee?> GetCompanyEmployeeByIdAsync(string id);
        Task<Companyemployee> CreateCompanyEmployeeAsync(Companyemployee companyEmployee);
        Task<bool> UpdateCompanyEmployeeAsync(string id, Companyemployee companyEmployee);
        Task<bool> DeleteCompanyEmployeeAsync(string id);
        bool CompanyEmployeeExists(string id);
    }
}

