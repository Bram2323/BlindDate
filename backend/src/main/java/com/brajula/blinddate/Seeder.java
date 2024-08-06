package com.brajula.blinddate;

import com.brajula.blinddate.entities.chat.Chat;
import com.brajula.blinddate.entities.chat.ChatRepository;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.interest.InterestService;
import com.brajula.blinddate.entities.message.Message;
import com.brajula.blinddate.entities.message.MessageRepository;
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

import java.time.LocalDateTime;
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
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    @Value("${blinddate.admin-password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        updateOrCreateAdmin();
        seedSexuality();
        seedInterests();
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
        List<Interest> interests =
                Arrays.asList(
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
        for (Interest interest : interests) {
            interestService.save(interest);
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
                        (new Sexuality("Furry")),
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
