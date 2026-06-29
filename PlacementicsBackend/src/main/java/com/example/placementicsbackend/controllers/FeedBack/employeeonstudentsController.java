package com.example.placementicsbackend.controllers.FeedBack;

import com.example.placementicsbackend.dtos.EmployeeFeedbackonStudent.EmployeeFeedbackOnStudentCreateDto;
import com.example.placementicsbackend.dtos.EmployeeFeedbackonStudent.EmployeeFeedbackOnStudentDto;
import com.example.placementicsbackend.services.Feedback.Interfaces.IEmployeeOnStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee-on-students")
@RequiredArgsConstructor
public class employeeonstudentsController {

    private final IEmployeeOnStudentService employeeOnStudentService;

    @GetMapping
    public ResponseEntity<List<EmployeeFeedbackOnStudentDto>> getEmployeeOnStudents() {
        return ResponseEntity.ok(employeeOnStudentService.getAllEmployeeOnStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeFeedbackOnStudentDto> getEmployeeOnStudent(@PathVariable Integer id) {
        EmployeeFeedbackOnStudentDto employee = employeeOnStudentService.getEmployeeOnStudentById(id);
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
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeOnStudentService.createEmployeeOnStudent(employeeOnStudent));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putEmployeeOnStudent(
            @PathVariable Integer id,
            @RequestBody EmployeeFeedbackOnStudentCreateDto updatedEmployeeOnStudent) {
        if (!employeeOnStudentService.updateEmployeeOnStudent(id, updatedEmployeeOnStudent)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeeOnStudent(@PathVariable Integer id) {
        if (!employeeOnStudentService.deleteEmployeeOnStudent(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
