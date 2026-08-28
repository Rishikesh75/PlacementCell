package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.userAccount.*;
import com.example.placementicsbackend.services.UserAccountService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user-accounts")
@RequiredArgsConstructor
@Tag(name = "User Accounts")
public class UserAccountController {

    private final UserAccountService service;

    @GetMapping
    public List<UserAccountResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public UserAccountResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<UserAccountResponse> create(
            @Valid @RequestBody UserAccountRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PatchMapping("/{id}/enable")
    public UserAccountResponse enable(@PathVariable UUID id) {
        return service.enable(id);
    }

    @PatchMapping("/{id}/disable")
    public UserAccountResponse disable(@PathVariable UUID id) {
        return service.disable(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}