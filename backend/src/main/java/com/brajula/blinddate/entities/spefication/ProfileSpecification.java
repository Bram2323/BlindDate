package com.brajula.blinddate.entities.spefication;

import com.brajula.blinddate.entities.profile.Profile;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class ProfileSpecification {

    // Param -> Gender
    public static Specification<Profile> hasGender(String gender) {
        return (Root<Profile> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            return builder.equal(root.get("gender"), gender);
        };
    }

    // Param -> Age Range
    public static Specification<Profile> hasAgeBetween(int minAge, int maxAge) {
        return (Root<Profile> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            LocalDate today = LocalDate.now();
            LocalDate maxBirthDate = today.minusYears(minAge);
            LocalDate minBirthDate = today.minusYears(maxAge);
            return criteriaBuilder.between(root.get("dateOfBirth"), minBirthDate, maxBirthDate);
        };
    }
    // Param -> preferences

    // Param -> interest

    // Param -> profile traits
}