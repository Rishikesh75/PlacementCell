package com.example.placementicsbackend.services.feedback.interfaces;

import com.example.placementicsbackend.dtos.EmployeeFeedbackonStudent.EmployeeFeedbackOnStudentCreateDto;
import com.example.placementicsbackend.dtos.EmployeeFeedbackonStudent.EmployeeFeedbackOnStudentDto;
import java.util.List;

public interface IEmployeeOnStudentService {

    List<EmployeeFeedbackOnStudentDto> getAllEmployeeOnStudents();

    EmployeeFeedbackOnStudentDto getEmployeeOnStudentById(int id);

    boolean createEmployeeOnStudent(EmployeeFeedbackOnStudentCreateDto employeeOnStudent);

    boolean updateEmployeeOnStudent(int id, EmployeeFeedbackOnStudentCreateDto employeeOnStudent);

    boolean deleteEmployeeOnStudent(int id);
}
