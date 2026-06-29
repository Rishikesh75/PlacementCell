package com.example.placementicsbackend.services.CRUD.impl;

import com.example.placementicsbackend.models.Teacher;
import com.example.placementicsbackend.repositories.TeacherRepository;
import com.example.placementicsbackend.services.crud.interfaces.ITeacherService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TeacherService implements ITeacherService {

    private final TeacherRepository teacherRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Teacher getTeacherById(String id) {
        return teacherRepository.findById(id).orElse(null);
    }

    @Override
    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public boolean updateTeacher(String id, Teacher teacher) {
        if (!teacherExists(id)) {
            return false;
        }
        teacher.setId(id);
        teacherRepository.save(teacher);
        return true;
    }

    @Override
    public boolean deleteTeacher(String id) {
        if (!teacherRepository.existsById(id)) {
            return false;
        }
        teacherRepository.deleteById(id);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean teacherExists(String id) {
        return teacherRepository.existsById(id);
    }
}
