package com.example.placementicsbackend.services.Feedback.impl;

import com.example.placementicsbackend.dtos.EmployeeFeedbackonStudent.EmployeeFeedbackOnStudentCreateDto;
import com.example.placementicsbackend.dtos.EmployeeFeedbackonStudent.EmployeeFeedbackOnStudentDto;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.CompanyEmployee;
import com.example.placementicsbackend.models.FeedBacks.EmployeeFeedbackonStudent;
import com.example.placementicsbackend.repositories.CompanyEmployeeRepository;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.repositories.EmployeeFeedbackonStudentRepository;
import com.example.placementicsbackend.services.feedback.interfaces.IEmployeeOnStudentService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeOnStudentService implements IEmployeeOnStudentService {

    private final EmployeeFeedbackonStudentRepository employeeFeedbackonStudentRepository;
    private final CompanyEmployeeRepository companyEmployeeRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeFeedbackOnStudentDto> getAllEmployeeOnStudents() {
        List<EmployeeFeedbackonStudent> feedbacks = employeeFeedbackonStudentRepository.findAll();
        List<String> employeeIds = feedbacks.stream()
                .map(EmployeeFeedbackonStudent::getCompanyEmpId)
                .distinct()
                .toList();

        Map<String, CompanyEmployee> employees = companyEmployeeRepository.findByEmployeeIdIn(employeeIds).stream()
                .collect(Collectors.toMap(CompanyEmployee::getEmployeeId, employee -> employee));

        List<String> companyIds = employees.values().stream()
                .map(CompanyEmployee::getCompanyId)
                .distinct()
                .toList();
        Map<String, String> companies = companyRepository.findByCompanyIdIn(companyIds).stream()
                .collect(Collectors.toMap(Company::getCompanyId, Company::getCompanyName));

        return feedbacks.stream()
                .map(feedback -> {
                    CompanyEmployee employee = employees.get(feedback.getCompanyEmpId());
                    String companyName = "Unknown";
                    if (employee != null) {
                        companyName = companies.getOrDefault(employee.getCompanyId(), "Unknown");
                    }
                    return toDto(feedback, employee, companyName);
                })
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeFeedbackOnStudentDto getEmployeeOnStudentById(int id) {
        EmployeeFeedbackonStudent feedback = employeeFeedbackonStudentRepository.findById(id).orElse(null);
        if (feedback == null) {
            return null;
        }

        CompanyEmployee employee = companyEmployeeRepository.findById(feedback.getCompanyEmpId()).orElse(null);
        String companyName = "Unknown";
        if (employee != null) {
            companyName = companyRepository.findById(employee.getCompanyId())
                    .map(Company::getCompanyName)
                    .orElse("Unknown");
        }

        return toDto(feedback, employee, companyName);
    }

    @Override
    public boolean createEmployeeOnStudent(EmployeeFeedbackOnStudentCreateDto employeeOnStudent) {
        EmployeeFeedbackonStudent model = new EmployeeFeedbackonStudent();
        model.setCompanyEmpId(employeeOnStudent.getCompanyEmpId());
        model.setBatchId(employeeOnStudent.getBatchId());
        model.setDescription(employeeOnStudent.getDescription());
        employeeFeedbackonStudentRepository.save(model);
        return true;
    }

    @Override
    public boolean updateEmployeeOnStudent(int id, EmployeeFeedbackOnStudentCreateDto employeeOnStudent) {
        EmployeeFeedbackonStudent existing = employeeFeedbackonStudentRepository.findById(id).orElse(null);
        if (existing == null) {
            return false;
        }

        existing.setCompanyEmpId(employeeOnStudent.getCompanyEmpId());
        existing.setBatchId(employeeOnStudent.getBatchId());
        existing.setDescription(employeeOnStudent.getDescription());
        employeeFeedbackonStudentRepository.save(existing);
        return true;
    }

    @Override
    public boolean deleteEmployeeOnStudent(int id) {
        if (!employeeFeedbackonStudentRepository.existsById(id)) {
            return false;
        }
        employeeFeedbackonStudentRepository.deleteById(id);
        return true;
    }

    private EmployeeFeedbackOnStudentDto toDto(
            EmployeeFeedbackonStudent feedback,
            CompanyEmployee employee,
            String companyName) {
        EmployeeFeedbackOnStudentDto dto = new EmployeeFeedbackOnStudentDto();
        dto.setId(String.valueOf(feedback.getRecordId()));
        dto.setEmployeeName(employee != null ? employee.getName() : "Unknown");
        dto.setCompnayName(companyName);
        dto.setBatchId(feedback.getBatchId());
        dto.setDescription(feedback.getDescription());
        return dto;
    }
}
