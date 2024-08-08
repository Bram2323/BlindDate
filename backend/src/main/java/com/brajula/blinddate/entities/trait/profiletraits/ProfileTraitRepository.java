package com.brajula.blinddate.entities.trait.profiletraits;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileTraitRepository extends JpaRepository<ProfileTrait, Long> {}
