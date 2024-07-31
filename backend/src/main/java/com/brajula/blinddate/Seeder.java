package com.brajula.blinddate;

import com.brajula.blinddate.domain.profile.ProfileDto;
import com.brajula.blinddate.domain.profile.ProfileService;
import com.brajula.blinddate.domain.sexuality.Sexuality;
import com.brajula.blinddate.domain.sexuality.SexualityService;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {
    private final SexualityService sexualityService;
    private final ProfileService profileService;

    @Override
    public void run(String... args) throws Exception {
        seedSexuality();
        seedProfiles();
    }

    private void seedSexuality() {
        List<Sexuality> sexualities =
                Arrays.asList(
                        (new Sexuality("Heterosexual")),
                        (new Sexuality("Homosexual")),
                        (new Sexuality("Bisexual")),
                        (new Sexuality("Pansexual")),
                        (new Sexuality("Asexual")),
                        (new Sexuality("Queer")),
                        (new Sexuality("Demisexual")),
                        (new Sexuality("Omnisexual")),
                        (new Sexuality("Sexual Fluidity")),
                        (new Sexuality("Androsexual")),
                        (new Sexuality("Gynosexual")),
                        (new Sexuality("Graysexual)")),
                        (new Sexuality("Skoliosexual")),
                        (new Sexuality("Polysexual")));
        for (Sexuality sexuality : sexualities) {
            sexualityService.save(sexuality);
        }
    }

    private void seedProfiles() {
        List<Long> idList =
                Arrays.asList(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L, 10L, 11L, 12L, 13L, 14L);
        List<ProfileDto> profiles =
                Arrays.asList(
                        new ProfileDto(
                                "I am a human being robot alien with humanoid traits",
                                "NONBINARY",
                                LocalDate.of(1952, 1, 1),
                                idList.subList(4, 8)),
                        new ProfileDto(
                                "I am a curious human being with a love for exploration",
                                "NONBINARY",
                                LocalDate.of(1990, 5, 15),
                                idList.subList(1, 5)),
                        new ProfileDto(
                                "I am a tech enthusiast with a passion for robotics",
                                "MALE",
                                LocalDate.of(1985, 11, 20),
                                idList.subList(2, 4)),
                        new ProfileDto(
                                "I am an artist who enjoys painting and sculpting",
                                "FEMALE",
                                LocalDate.of(1978, 7, 25),
                                idList.subList(5, 7)),
                        new ProfileDto(
                                "I am a writer with a penchant for science fiction",
                                "NONBINARY",
                                LocalDate.of(1982, 3, 30),
                                idList.subList(7, 9)),
                        new ProfileDto(
                                "I am a musician who plays multiple instruments",
                                "MALE",
                                LocalDate.of(1992, 2, 10),
                                idList.subList(1, 13)),
                        new ProfileDto(
                                "I am a chef who specializes in international cuisine",
                                "FEMALE",
                                LocalDate.of(1980, 6, 5),
                                idList.subList(1, 11)),
                        new ProfileDto(
                                "I am a scientist dedicated to environmental conservation",
                                "NONBINARY",
                                LocalDate.of(1988, 8, 14),
                                idList.subList(11, 13)),
                        new ProfileDto(
                                "I am a historian with a focus on ancient civilizations",
                                "MALE",
                                LocalDate.of(1975, 9, 22),
                                idList.subList(1, 3)),
                        new ProfileDto(
                                "I am a software developer with a love for open-source projects",
                                "FEMALE",
                                LocalDate.of(1995, 12, 19),
                                idList.subList(1, 14)),
                        new ProfileDto(
                                "I am a traveler who enjoys discovering new cultures",
                                "NONBINARY",
                                LocalDate.of(1991, 4, 1),
                                idList.subList(1, 7)));

        for (ProfileDto profile : profiles) {
            profileService.save(profile);
        }
    }
}
