package com.example.placementicsbackend.services.Interfaces;

import com.example.placementicsbackend.models.Teacher;
import java.util.List;

public interface ITeacherService {

    List<Teacher> getAllTeachers();

    Teacher getTeacherById(String id);

    Teacher createTeacher(Teacher teacher);

    boolean updateTeacher(String id, Teacher teacher);

    boolean deleteTeacher(String id);

    boolean teacherExists(String id);
}
