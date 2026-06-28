package com.example.placementicsbackend.controllers.CRUD;

import com.example.placementicsbackend.dtos.CompanyEmployee.CompanyEmployeeCreateDto;
import com.example.placementicsbackend.dtos.CompanyEmployee.CompanyEmployeeDto;
import com.example.placementicsbackend.services.crud.interfaces.ICompanyEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-employee")
@RequiredArgsConstructor
public class CompanyEmployeeController {

    private final ICompanyEmployeeService companyEmployeeService;

    @GetMapping
    public ResponseEntity<List<CompanyEmployeeDto>> getCompanyEmployees() {
        return ResponseEntity.ok(companyEmployeeService.getAllCompanyEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyEmployeeDto> getCompanyEmployee(@PathVariable String id) {
        CompanyEmployeeDto employee = companyEmployeeService.getCompanyEmployeeById(id);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employee);
    }

    @PostMapping
    public ResponseEntity<Boolean> postCompanyEmployee(@RequestBody CompanyEmployeeCreateDto companyEmployee) {
        boolean created = companyEmployeeService.createCompanyEmployee(companyEmployee);
        if (!created) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(true);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putCompanyEmployee(
            @PathVariable String id,
            @RequestBody CompanyEmployeeCreateDto updatedCompanyEmployee) {
        if (!companyEmployeeService.updateCompanyEmployee(id, updatedCompanyEmployee)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompanyEmployee(@PathVariable String id) {
        if (!companyEmployeeService.deleteCompanyEmployee(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
