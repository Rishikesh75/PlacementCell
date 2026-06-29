package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.CompanyEmployee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyEmployeeRepository extends JpaRepository<CompanyEmployee, String> {

    List<CompanyEmployee> findByEmployeeIdIn(List<String> employeeIds);
}
