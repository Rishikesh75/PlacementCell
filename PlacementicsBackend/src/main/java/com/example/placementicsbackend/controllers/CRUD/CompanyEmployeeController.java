package com.example.placementicsbackend.controllers.CRUD;

import com.example.dto.CompanyEmployeeCreateDto;
import com.example.dto.CompanyEmployeeDto;
import com.example.service.CompanyEmployeeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-employee")
public class CompanyEmployeeController {

    private final CompanyEmployeeService companyEmployeeService;

    public CompanyEmployeeController(CompanyEmployeeService companyEmployeeService) {
        this.companyEmployeeService = companyEmployeeService;
    }

    /**
     * Get all company employees
     */
    @GetMapping
    public ResponseEntity<List<CompanyEmployeeDto>> getCompanyEmployees() {

        List<CompanyEmployeeDto> employees =
                companyEmployeeService.getAllCompanyEmployees();

        return ResponseEntity.ok(employees);
    }

    /**
     * Get company employee by Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<CompanyEmployeeDto> getCompanyEmployee(
            @PathVariable String id) {

        CompanyEmployeeDto employee =
                companyEmployeeService.getCompanyEmployeeById(id);

        if (employee == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(employee);
    }

    /**
     * Create company employee
     */
    @PostMapping
    public ResponseEntity<Boolean> postCompanyEmployee(
            @RequestBody CompanyEmployeeCreateDto companyEmployee) {

        boolean created =
                companyEmployeeService.createCompanyEmployee(companyEmployee);

        if (!created) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(false);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(true);
    }

    /**
     * Update company employee
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> putCompanyEmployee(
            @PathVariable String id,
            @RequestBody CompanyEmployeeCreateDto updatedCompanyEmployee) {

        boolean success =
                companyEmployeeService.updateCompanyEmployee(
                        id,
                        updatedCompanyEmployee);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    /**
     * Delete company employee
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompanyEmployee(
            @PathVariable String id) {

        boolean success =
                companyEmployeeService.deleteCompanyEmployee(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}