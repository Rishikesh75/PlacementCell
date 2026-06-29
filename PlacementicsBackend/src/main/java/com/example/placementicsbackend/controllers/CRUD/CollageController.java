package com.example.placementicsbackend.controllers.CRUD;

import com.example.placementicsbackend.models.College;
import com.example.placementicsbackend.services.CRUD.Interfaces.ICollageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/college")
@RequiredArgsConstructor
public class CollageController {

    private final ICollageService collageService;

    @GetMapping
    public ResponseEntity<List<College>> getAllColleges() {

        List<College> colleges = collageService.getAllColleges();

        return ResponseEntity.ok(colleges);
    }

    @GetMapping("/{id}")
    public ResponseEntity<College> getCollegeById(
            @PathVariable Integer id) {

        College college = collageService.getCollegeById(id);

        if (college == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(college);
    }

    @PostMapping
    public ResponseEntity<College> createCollege(
            @RequestBody College college) {

        College created = collageService.createCollege(college);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }
}