package com.brajula.blinddate;

import com.brajula.blinddate.entities.chat.Chat;
import com.brajula.blinddate.entities.chat.ChatRepository;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.interest.InterestRepository;
import com.brajula.blinddate.entities.message.Message;
import com.brajula.blinddate.entities.message.MessageRepository;
import com.brajula.blinddate.entities.profile.Gender;
import com.brajula.blinddate.entities.profile.Profile;
import com.brajula.blinddate.entities.profile.ProfileRepository;
import com.brajula.blinddate.entities.profile.ProfileService;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.sexuality.SexualityRepository;
import com.brajula.blinddate.entities.trait.Trait;
import com.brajula.blinddate.entities.trait.TraitRepository;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.entities.user.UserService;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final SexualityRepository sexualityRepository;
    private final InterestRepository interestRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final TraitRepository traitRepository;
    private final ProfileRepository profileRepository;
    private final ProfileService profileService;

    @Value("${blinddate.admin-password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        updateOrCreateAdmin();
        seedSexuality();
        seedInterests();
        seedQuestions();
        seedProfiles();
        seedChats();
    }

    private void seedChats() {
        if (chatRepository.count() != 0) return;

        Optional<User> possibleUser1 = userRepository.findByUsernameIgnoreCase("test1");
        Optional<User> possibleUser2 = userRepository.findByUsernameIgnoreCase("test2");

        User user1 =
                possibleUser1.orElse(
                        userService.register("test1", "test", "test", "test", "test@test.test"));
        User user2 =
                possibleUser2.orElse(
                        userService.register("test2", "test", "test", "test", "test@test.test"));

        Chat chat = new Chat(user1, user2, LocalDateTime.now());
        chatRepository.save(chat);

        Message message1 =
                new Message(chat, user1, "This is a normal conversation", LocalDateTime.now());
        Message message2 =
                new Message(chat, user2, "Exactly, nothing suspicious here", LocalDateTime.now());

        messageRepository.save(message1);
        messageRepository.save(message2);
    }

    private void seedInterests() {
        if (interestRepository.count() != 0) return;
        List<Interest> interests =
                List.of(
                        new Interest("Photography"),
                        new Interest("Hiking"),
                        new Interest("Cooking"),
                        new Interest("Gardening"),
                        new Interest("Reading"),
                        new Interest("Writing"),
                        new Interest("Traveling"),
                        new Interest("Playing a musical instrument"),
                        new Interest("Drawing or painting"),
                        new Interest("Dancing"),
                        new Interest("Yoga"),
                        new Interest("Meditation"),
                        new Interest("Cycling"),
                        new Interest("Bird watching"),
                        new Interest("Astronomy"),
                        new Interest("Chess"),
                        new Interest("Board games"),
                        new Interest("Knitting"),
                        new Interest("Crocheting"),
                        new Interest("Pottery"),
                        new Interest("DIY projects"),
                        new Interest("Scrapbooking"),
                        new Interest("Learning new languages"),
                        new Interest("Volunteering"),
                        new Interest("Fitness"),
                        new Interest("Blogging or vlogging"),
                        new Interest("Fishing"),
                        new Interest("Camping"),
                        new Interest("Rock climbing"),
                        new Interest("Surfing"),
                        new Interest("Baking"));
        interestRepository.saveAll(interests);
    }

    private void updateOrCreateAdmin() {
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
        if (sexualityRepository.count() != 0) return;
        List<Sexuality> sexualities =
                List.of(
                        (new Sexuality("Heterosexual")),
                        (new Sexuality("Homosexual")),
                        (new Sexuality("Bisexual")),
                        (new Sexuality("Pansexual")),
                        (new Sexuality("Asexual")),
                        (new Sexuality("Queer")),
                        (new Sexuality("Demisexual")),
                        (new Sexuality("Omnisexual")),
                        (new Sexuality("Sexual Fluidity")),
                        (new Sexuality("Furry")),
                        (new Sexuality("Androsexual")),
                        (new Sexuality("Gynosexual")),
                        (new Sexuality("Graysexual")),
                        (new Sexuality("Skoliosexual")),
                        (new Sexuality("Polysexual")));

        sexualityRepository.saveAll(sexualities);
    }

    private void seedQuestions() {
        if (traitRepository.count() != 0) return;
        List<Trait> traits =
                List.of(
                        new Trait("Do you enjoy outdoor activities?"),
                        new Trait("Are you a morning person?"),
                        new Trait("Do you like trying new foods?"),
                        new Trait("Is traveling a passion of yours?"),
                        new Trait("Do you prefer reading books over watching movies?"),
                        new Trait("Are you a dog person?"),
                        new Trait("Do you enjoy cooking?"),
                        new Trait("Is fitness a priority for you?"),
                        new Trait("Do you like going to parties?"),
                        new Trait("Are you a fan of spontaneous plans?"));
        traitRepository.saveAll(traits);
    }

    private void seedProfiles() {
        if (profileRepository.count() != 0) return;
        List<Profile> testProfiles =
                List.of(
                        new Profile(
                                "Cool person 1",
                                Gender.OTHER,
                                Gender.FEMALE,
                                LocalDate.of(1994, 4, 25),
                                userService.register(
                                        "TestUser1", "Test!234", "TE1", "ST1", "test1@test.com")),
                        new Profile(
                                "Cool person 2",
                                Gender.MALE,
                                Gender.MALE,
                                LocalDate.of(1994, 4, 25),
                                userService.register(
                                        "TestUser2", "Test!234", "TE2", "ST2", "test2@test.com")),
                        new Profile(
                                "Cool person 3",
                                Gender.FEMALE,
                                Gender.NONBINARY,
                                LocalDate.of(1994, 4, 25),
                                userService.register(
                                        "TestUser3", "Test!234", "TE3", "ST3", "test3@test.com")),
                        new Profile(
                                "Cool person 4",
                                Gender.NONBINARY,
                                Gender.OTHER,
                                LocalDate.of(1994, 4, 25),
                                userService.register(
                                        "TestUser4", "Test!234", "TE4", "ST4", "test4test.com")),
                        new Profile(
                                "Cool person 5",
                                Gender.MALE,
                                Gender.FEMALE,
                                LocalDate.of(1994, 4, 25),
                                userService.register(
                                        "TestUser5", "Test!234", "TE5", "ST5", "test5@test.com")));
        profileRepository.saveAll(testProfiles);
    }
}
