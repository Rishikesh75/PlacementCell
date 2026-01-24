using PlacementCellBackend.DTOs.CompanyEmployee;

namespace PlacementCellBackend.Services.CRUD.Interfaces;

public interface ICompanyEmployeeService
{
    Task<IEnumerable<CompanyEmployeeDto>> GetAllCompanyEmployeesAsync();
    Task<CompanyEmployeeDto?> GetCompanyEmployeeByIdAsync(string id);
    Task<bool> CreateCompanyEmployeeAsync(CompanyEmployeeCreateDto companyEmployee);
    Task<bool> UpdateCompanyEmployeeAsync(string id, CompanyEmployeeCreateDto companyEmployee);
    Task<bool> DeleteCompanyEmployeeAsync(string id);
    bool CompanyEmployeeExists(string id);
}

