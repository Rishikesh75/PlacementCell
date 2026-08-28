package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.userAccount.*;
import com.example.placementicsbackend.exceptions.*;
import com.example.placementicsbackend.mappers.UserAccountMapper;
import com.example.placementicsbackend.models.UserAccount;
import com.example.placementicsbackend.repositories.jpa.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserAccountService {

    private final UserAccountRepository repository;
    private final UserAccountMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public List<UserAccountResponse> findAll() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    public UserAccountResponse findById(UUID id) {
        return mapper.toResponse(getAccount(id));
    }

    @Transactional
    public UserAccountResponse create(UserAccountRequest request) {
        if (repository.existsByEmailIgnoreCase(request.email().trim())) {
            throw new DuplicateResourceException(
                    "User account email already exists"
            );
        }

        String encodedPassword = passwordEncoder.encode(request.password());

        UserAccount account = mapper.toEntity(
                request,
                encodedPassword
        );

        return mapper.toResponse(repository.save(account));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getAccount(id));
    }

    @Transactional
    public UserAccountResponse enable(UUID id) {
        UserAccount account = getAccount(id);
        account.setEnabled(true);
        return mapper.toResponse(repository.save(account));
    }

    @Transactional
    public UserAccountResponse disable(UUID id) {
        UserAccount account = getAccount(id);
        account.setEnabled(false);
        return mapper.toResponse(repository.save(account));
    }

    private UserAccount getAccount(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User account not found: " + id
                ));
    }
}