package com.brajula.blinddate;

import static com.brajula.blinddate.mockdata.MockInterests.INTERESTS;
import static com.brajula.blinddate.mockdata.MockSexualities.SEXUALITIES;
import static com.brajula.blinddate.mockdata.MockTraits.TRAITS;
import static com.brajula.blinddate.mockdata.MockUsers.USERS;

import com.brajula.blinddate.entities.chat.Chat;
import com.brajula.blinddate.entities.chat.ChatRepository;
import com.brajula.blinddate.entities.images.ImageRepository;
import com.brajula.blinddate.entities.images.ImageService;
import com.brajula.blinddate.entities.images.ImageUploadResponse;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.interest.InterestRepository;
import com.brajula.blinddate.entities.message.Message;
import com.brajula.blinddate.entities.message.MessageRepository;
import com.brajula.blinddate.entities.profile.Profile;
import com.brajula.blinddate.entities.profile.ProfileRepository;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.sexuality.SexualityRepository;
import com.brajula.blinddate.entities.trait.Trait;
import com.brajula.blinddate.entities.trait.TraitRepository;
import com.brajula.blinddate.entities.trait.profiletraits.Answer;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTrait;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTraitRepository;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.entities.user.UserService;
import com.brajula.blinddate.exceptions.NotFoundException;
import com.brajula.blinddate.mockdata.MockImage;
import com.brajula.blinddate.mockdata.MockProfiles;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

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
    private final ProfileTraitRepository profileTraitRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    @Value("${blinddate.admin-password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        updateOrCreateAdmin();
        seedSexuality();
        seedInterests();
        seedQuestions();
        seedChats();
        SeedProfilesWithUsersAndImages();
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
        interestRepository.saveAll(INTERESTS);
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
        sexualityRepository.saveAll(SEXUALITIES);
    }

    private void seedQuestions() {
        if (traitRepository.count() > 0) return;
        traitRepository.saveAll(TRAITS);
    }

    private User seedUser(SeedUserDto user) {
        return userService.register(
                user.username(), user.password(), user.firstname(), user.lastname(), user.email());
    }

    private List<ProfileTrait> seedProfileTraits() {
        List<Trait> traitList = traitRepository.findAll();
        Random random = new Random();
        List<Answer> answers = Arrays.asList(Answer.YES, Answer.NO, Answer.IT_DEPENDS);
        Answer randomAnswer = answers.get(random.nextInt(0, 3));
        List<ProfileTrait> profileTraitList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            ProfileTrait profileTrait =
                    new ProfileTrait(
                            traitList.get(random.nextInt(0, traitList.size())), randomAnswer);
            profileTraitRepository.save(profileTrait);
            profileTraitList.add(profileTrait);
        }
        return profileTraitList;
    }

    private void SeedProfilesWithUsersAndImages() throws IOException {
        if (userRepository.count() > 4) return;
        List<Sexuality> sexualityList = sexualityRepository.findAll();
        int maxS = sexualityList.size();

        int count = MockProfiles.PROFILES.size();

        Random random = new Random();

        List<Interest> interestList = interestRepository.findAll();
        int maxI = interestList.size();

        for (com.brajula.blinddate.SeedUserDto user : USERS) {
            User savedUser = seedUser(user);
            Profile profile = MockProfiles.PROFILES.get(random.nextInt(0, count));
            profile.setUser(savedUser);
            // dit genereert een gebroken image,is de bedoeling totdat beter alternatief
            ImageUploadResponse image =
                    imageService.uploadImage(
                            MockImage.ONE_PIXEL_IMAGE, user.username() + "img.png", "image/png");
            profile.setImage(
                    imageRepository.findById(image.id()).orElseThrow(NotFoundException::new));
            profile.setSexualities(
                    new HashSet<>(sexualityList.subList(random.nextInt(0, maxS), maxS)));
            profile.setInterests(
                    new HashSet<>(interestList.subList(random.nextInt(0, maxI), maxI)));
            profile.setProfileTraits(new HashSet<>(seedProfileTraits()));

            profileRepository.save(profile);
        }
    }
}
