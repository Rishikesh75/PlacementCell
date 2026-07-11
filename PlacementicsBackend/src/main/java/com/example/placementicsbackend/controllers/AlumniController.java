package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dtos.AlumniDtos.AlumniDto;
import com.example.placementicsbackend.dtos.AlumniDtos.AlumniDtoCreate;
import com.example.placementicsbackend.dtos.AlumniDtos.AlumniDtoUpdate;
import com.example.placementicsbackend.models.Alumni;
import com.example.placementicsbackend.services.Interfaces.IAlumniService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumni")
@RequiredArgsConstructor
public class AlumniController {

    private final IAlumniService alumniService;

    @GetMapping
    public ResponseEntity<List<AlumniDto>> getAlumniList() {

        List<AlumniDto> alumni =
                alumniService.getAllAlumni();

        return ResponseEntity.ok(alumni);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniDto> getAlumni(
            @PathVariable String id) {

        AlumniDto alumni =
                alumniService.getAlumniByIdWithCompany(id);

        if (alumni == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(alumni);
    }

    @PostMapping
    public ResponseEntity<Alumni> postAlumni(
            @RequestBody AlumniDtoCreate alumniDto) {

        Alumni alumni = new Alumni();
        alumni.setId(alumniDto.getId());
        alumni.setPosition(alumniDto.getPosition());
        alumni.setLinkedinProfile(alumniDto.getLinkedInProfile());
        alumni.setCompanyId(alumniDto.getCompanyId());
        alumni.setName(alumniDto.getName());

        Alumni created = alumniService.createAlumni(alumni);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putAlumni(
            @PathVariable String id,
            @RequestBody AlumniDtoUpdate updatedAlumni) {

        boolean success =
                alumniService.updateAlumni(id, updatedAlumni);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumni(
            @PathVariable String id) {

        boolean success =
                alumniService.deleteAlumni(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}