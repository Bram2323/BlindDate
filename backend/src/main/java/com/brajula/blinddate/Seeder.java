package com.brajula.blinddate;

import com.brajula.blinddate.entities.chat.Chat;
import com.brajula.blinddate.entities.chat.ChatRepository;
import com.brajula.blinddate.entities.interest.InterestRepository;
import com.brajula.blinddate.entities.message.Message;
import com.brajula.blinddate.entities.message.MessageRepository;
import com.brajula.blinddate.entities.sexuality.SexualityRepository;
import com.brajula.blinddate.entities.trait.TraitRepository;
import com.brajula.blinddate.entities.user.SeedUsersDto;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.entities.user.UserService;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
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

    @Value("${blinddate.admin-password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        updateOrCreateAdmin();
        seedSexuality();
        seedInterests();
        seedQuestions();
        seedChats();
    }

    private void seedChats() {
        if (chatRepository.count() > 0) return;

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
        if (interestRepository.count() > 0) return;
        interestRepository.saveAll(MockData.INTERESTS);
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
        if (sexualityRepository.count() > 0) return;
        sexualityRepository.saveAll(MockData.SEXUALITIES);
    }

    private void seedQuestions() {
        if (traitRepository.count() > 0) return;
        traitRepository.saveAll(MockData.TRAITS);
    }

    private void seedUsers() {
        if (userRepository.count() > 0) return;
        for (SeedUsersDto user : MockData.USERS) {
            userService.register(
                    user.username(),
                    user.password(),
                    user.firstname(),
                    user.lastname(),
                    user.email());
        }
    }
}
