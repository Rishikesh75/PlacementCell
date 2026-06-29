package com.example.placementicsbackend.controllers.CRUD;

import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.services.CRUD.Interfaces.ICompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final ICompanyService companyService;

    @GetMapping
    public ResponseEntity<List<Company>> getCompany() {

        List<Company> companies = companyService.getAllCompanies();

        return ResponseEntity.ok(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompany(
            @PathVariable String id) {

        Company company = companyService.getCompanyById(id);

        if (company == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(company);
    }

    @PostMapping
    public ResponseEntity<Company> postCompany(
            @RequestBody Company company) {

        Company created = companyService.createCompany(company);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putCompany(
            @PathVariable String id,
            @RequestBody Company updatedCompany) {

        if (!id.equals(updatedCompany.getCompanyId())) {
            return ResponseEntity.badRequest().build();
        }

        boolean success =
                companyService.updateCompany(id, updatedCompany);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(
            @PathVariable String id) {

        boolean success = companyService.deleteCompany(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}