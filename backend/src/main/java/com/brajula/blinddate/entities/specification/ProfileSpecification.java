package com.brajula.blinddate.entities.specification;

import com.brajula.blinddate.entities.profile.Gender;
import com.brajula.blinddate.entities.profile.Profile;
import com.brajula.blinddate.entities.sexuality.Sexuality;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class ProfileSpecification {

    // Param -> Gender
    public static Specification<Profile> hasGender(Gender gender) {
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
    public static Specification<Profile> hasPreferences(List<Sexuality> preferences) {
        return (root, query, criteriaBuilder) -> {
            Join<Profile, Sexuality> preferenceJoin = root.join("sexualities");
            CriteriaBuilder.In<Sexuality> inClause = criteriaBuilder.in(preferenceJoin);
            for (Sexuality preference : preferences) {
                inClause.value(preference);
            }
            return inClause;
        };
    }

    // Param -> interest

    // Param -> profile traits
}
