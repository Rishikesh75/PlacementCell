package com.example.placementicsbackend.services.crud.impl;

import com.example.placementicsbackend.models.College;
import com.example.placementicsbackend.repositories.CollegeRepository;
import com.example.placementicsbackend.services.crud.interfaces.ICollageService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CollageService implements ICollageService {

    private final CollegeRepository collegeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<College> getAllColleges() {
        return collegeRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public College getCollegeById(int id) {
        return collegeRepository.findById(id).orElse(null);
    }

    @Override
    public College createCollege(College college) {
        return collegeRepository.save(college);
    }

    @Override
    public boolean updateCollege(int id, College college) {
        if (!collegeRepository.existsById(id)) {
            return false;
        }
        college.setId(id);
        collegeRepository.save(college);
        return true;
    }

    @Override
    public boolean deleteCollege(int id) {
        if (!collegeRepository.existsById(id)) {
            return false;
        }
        collegeRepository.deleteById(id);
        return true;
    }
}
