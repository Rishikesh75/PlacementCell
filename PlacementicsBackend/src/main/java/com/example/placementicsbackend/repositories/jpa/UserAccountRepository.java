package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.UserAccount;
import com.example.placementicsbackend.models.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserAccountRepository extends JpaRepository<UserAccount, UUID> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);

    Optional<UserAccount> findByEmailIgnoreCase(String email);

    List<UserAccount> findByRole(UserRole role);

    Optional<UserAccount> findByStudentId(UUID studentId);

    Optional<UserAccount> findByTeacherId(UUID teacherId);

    Optional<UserAccount> findByAlumniId(UUID alumniId);

    Optional<UserAccount> findByTpoId(UUID tpoId);

    Optional<UserAccount> findByCollegeCompanyId(UUID collegeCompanyId);

    List<UserAccount> findByEnabledTrue();
}