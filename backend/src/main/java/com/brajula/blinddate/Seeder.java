package com.brajula.blinddate;

import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.interest.InterestService;
import com.brajula.blinddate.entities.profile.ProfileRepository;
import com.brajula.blinddate.entities.profile.ProfileService;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.sexuality.SexualityRepository;
import com.brajula.blinddate.entities.sexuality.SexualityService;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.entities.user.UserService;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final SexualityService sexualityService;
    private final SexualityRepository sexualityRepository;
    private final ProfileRepository profileRepository;
    private final ProfileService profileService;
    private final InterestService interestService;

    @Value("${blinddate.admin-password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        seedSexuality();
        seedInterests();
        updateOrCreateAdmin();
    }

    private void seedInterests() {
        List<String> interests =
                Arrays.asList(
                        "Photography",
                        "Hiking",
                        "Cooking",
                        "Gardening",
                        "Reading",
                        "Writing",
                        "Traveling",
                        "Playing a musical instrument",
                        "Drawing or painting",
                        "Dancing",
                        "Yoga",
                        "Meditation",
                        "Cycling",
                        "Bird watching",
                        "Astronomy",
                        "Chess",
                        "Board games",
                        "Knitting or crocheting",
                        "Pottery",
                        "DIY projects",
                        "Scrapbooking",
                        "Learning new languages",
                        "Volunteering",
                        "Fitness and weightlifting",
                        "Blogging or vlogging",
                        "Fishing",
                        "Camping",
                        "Rock climbing",
                        "Surfing",
                        "Baking");
        for (String interest : interests) {
            interestService.save(new Interest(interest));
        }
    }

    public void updateOrCreateAdmin() {
        Optional<User> possibleAdmin = userRepository.findByUsernameIgnoreCase("admin");
        if (possibleAdmin.isEmpty()) {
            User admin =
                    userService.register(
                            "admin", adminPassword, "admin", "admin", "admin@admin.admin");
            userService.changeRole(admin, Role.ADMIN);
        } else {
            User admin = possibleAdmin.get();
            if (!userService.isCorrectPassword(admin, adminPassword))
                userService.changePassword(admin, adminPassword);
        }
    }

    private void seedSexuality() {
        if (!sexualityRepository.findAll().isEmpty()) return;
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
                        (new Sexuality("Graysexual")),
                        (new Sexuality("Skoliosexual")),
                        (new Sexuality("Polysexual")));
        for (Sexuality sexuality : sexualities) {
            sexualityService.save(sexuality);
        }
    }
}
