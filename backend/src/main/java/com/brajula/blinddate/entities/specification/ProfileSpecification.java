package com.brajula.blinddate.entities.specification;

import com.brajula.blinddate.entities.profile.Gender;
import com.brajula.blinddate.entities.profile.Profile;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class ProfileSpecification {

    // Param -> Gender
    public static Specification<Profile> hasGender(List<Gender> genders) {
        return (Root<Profile> root, CriteriaQuery<?> query, CriteriaBuilder builder) ->
                root.get("gender").in(genders);
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
}
