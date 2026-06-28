package com.example.placementicsbackend.controllers.FeedBack;

import com.placementcellbackend.dto.employeefeedbackonstudent.EmployeeFeedbackOnStudentCreateDto;
import com.placementcellbackend.dto.employeefeedbackonstudent.EmployeeFeedbackOnStudentDto;
import com.placementcellbackend.services.feedback.interfaces.IEmployeeOnStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee-on-students")
@RequiredArgsConstructor
public class EmployeeOnStudentsController {

    private final IEmployeeOnStudentService employeeOnStudentService;

    @GetMapping
    public ResponseEntity<List<EmployeeFeedbackOnStudentDto>> getEmployeeOnStudents() {

        List<EmployeeFeedbackOnStudentDto> employees =
                employeeOnStudentService.getAllEmployeeOnStudents();

        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeFeedbackOnStudentDto> getEmployeeOnStudent(
            @PathVariable Integer id) {

        EmployeeFeedbackOnStudentDto employee =
                employeeOnStudentService.getEmployeeOnStudentById(id);

        if (employee == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(employee);
    }

    @PostMapping
    public ResponseEntity<Boolean> postEmployeeOnStudent(
            @RequestBody EmployeeFeedbackOnStudentCreateDto employeeOnStudent) {

        if (employeeOnStudent == null) {
            return ResponseEntity.badRequest().body(false);
        }

        boolean created =
                employeeOnStudentService.createEmployeeOnStudent(employeeOnStudent);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putEmployeeOnStudent(
            @PathVariable Integer id,
            @RequestBody EmployeeFeedbackOnStudentCreateDto updatedEmployeeOnStudent) {

        boolean success =
                employeeOnStudentService.updateEmployeeOnStudent(id, updatedEmployeeOnStudent);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeeOnStudent(
            @PathVariable Integer id) {

        boolean success =
                employeeOnStudentService.deleteEmployeeOnStudent(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}