package com.brajula.blinddate;

import static com.brajula.blinddate.mockdata.MockInterests.INTERESTS;
import static com.brajula.blinddate.mockdata.MockPreferences.PREFERENCES;
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
import com.brajula.blinddate.entities.preferences.Preference;
import com.brajula.blinddate.entities.preferences.PreferenceRepository;
import com.brajula.blinddate.entities.profile.Gender;
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
import com.brajula.blinddate.mockdata.MockProfiles;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
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
    private final PreferenceRepository preferenceRepository;

    @Value("${blinddate.admin-password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        updateOrCreateAdmin();
        seedSexuality();
        seedPreferences();
        seedInterests();
        seedQuestions();
        seedChats();
        SeedProfilesWithUsersAndImages();
    }

    @Value("${image.folder.path:src/main/resources/images}")
    private String imageFolderPath;

    public Random random = new Random();

    private void seedChats() throws IOException {
        if (chatRepository.count() > 0) return;

        Optional<User> possibleUser1 = userRepository.findByUsernameIgnoreCase("test1");
        Optional<User> possibleUser2 = userRepository.findByUsernameIgnoreCase("test2");

        User user1 =
                possibleUser1.orElse(
                        userService.register("test1", "test", "test", "test", "test@test.test"));
        User user2 =
                possibleUser2.orElse(
                        userService.register("test2", "test", "test", "test", "test@test.test"));

        Profile profile1 =
                new Profile(
                        "Not a robot!",
                        Gender.MALE,
                        List.of(Gender.FEMALE),
                        LocalDate.of(1969, 4, 20));

        Profile profile2 =
                new Profile("sus", Gender.MALE, List.of(Gender.FEMALE), LocalDate.of(1969, 4, 20));

        seedProfile(profile1, user1);
        seedProfile(profile2, user2);

        Chat chat = new Chat(user1, user2, LocalDateTime.now());
        chatRepository.save(chat);

        Message message1 =
                new Message(chat, user1, "This is a normal conversation", LocalDateTime.now());
        Message message2 =
                new Message(chat, user2, "Exactly, nothing suspicious here", LocalDateTime.now());

        messageRepository.save(message1);
        messageRepository.save(message2);
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

    private void seedInterests() {
        if (interestRepository.count() > 0) return;
        interestRepository.saveAll(INTERESTS);
    }

    private void seedQuestions() {
        if (traitRepository.count() > 0) return;
        traitRepository.saveAll(TRAITS);
    }

    private void seedPreferences() {
        if (preferenceRepository.count() > 0) return;
        preferenceRepository.saveAll(PREFERENCES);
    }

    private User seedUser(SeedUserDto user) {
        return userService.register(
                user.username(), user.password(), user.firstname(), user.lastname(), user.email());
    }

    private List<ProfileTrait> getProfileTraits() {
        List<Trait> traitList = traitRepository.findAll();
        List<Answer> answers = Arrays.asList(Answer.YES, Answer.NO, Answer.IT_DEPENDS);

        Set<Trait> randomTraitList = new HashSet<>();
        do {
            Trait trait = traitList.get(random.nextInt(0, traitList.size()));
            randomTraitList.add(trait);
        } while (randomTraitList.size() < 5);
        List<ProfileTrait> profileTraitList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Answer randomAnswer = answers.get(random.nextInt(0, 3));
            ProfileTrait profileTrait =
                    new ProfileTrait(
                            traitList.get(random.nextInt(0, traitList.size())), randomAnswer);
            if (profileTraitList.stream()
                    .anyMatch(
                            trait ->
                                    Objects.equals(
                                            trait.getTrait().getId(),
                                            profileTrait.getTrait().getId()))) continue;
            profileTraitRepository.save(profileTrait);
            profileTraitList.add(profileTrait);
        }
        return profileTraitList;
    }

    private List<Sexuality> getSexualities() {
        List<Sexuality> sexualityList = sexualityRepository.findAll();
        int max = sexualityList.size();
        List<Sexuality> randomPreferences = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Sexuality preference = sexualityList.get(random.nextInt(0, max));
            if (randomPreferences.stream()
                    .anyMatch(sexuality -> Objects.equals(sexuality.getId(), preference.getId())))
                continue;
            randomPreferences.add(preference);
        }
        return randomPreferences;
    }

    private List<Interest> getInterests() {
        List<Interest> interestList = interestRepository.findAll();
        int max = interestList.size();
        List<Interest> randomInterests = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Interest randomInterest = interestList.get(random.nextInt(0, max));
            if (randomInterests.stream()
                    .anyMatch(interest -> Objects.equals(interest.getId(), randomInterest.getId())))
                continue;
            randomInterests.add(randomInterest);
        }
        return randomInterests;
    }

    private List<Preference> getPreferences() {
        List<Preference> preferencesList = preferenceRepository.findAll();
        int max = preferencesList.size();
        List<Preference> randomPreferences = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            randomPreferences.add(preferencesList.get(random.nextInt(0, max)));
        }
        return randomPreferences;
    }

    private void SeedProfilesWithUsersAndImages() throws IOException {
        if (userRepository.count() > 4) return;
        int count = MockProfiles.PROFILES.size();
        for (SeedUserDto user : USERS) {
            User savedUser = seedUser(user);
            Profile profile = MockProfiles.PROFILES.get(random.nextInt(0, count));
            seedProfile(profile, savedUser);
        }
    }

    private void seedProfile(Profile profile, User user) throws IOException {
        profile.setUser(user);
        profile.setImage(
                imageRepository.findById(seedProfileImage()).orElseThrow(NotFoundException::new));
        profile.setSexualities(new HashSet<>(getSexualities()));
        profile.setInterests(new HashSet<>(getInterests()));
        profile.setProfileTraits(new HashSet<>(getProfileTraits()));
        profile.setPreferences(new HashSet<>(getPreferences()));

        profileRepository.save(profile);
    }

    public Long seedProfileImage() throws IOException {
        Path imageFolder = Paths.get(imageFolderPath);
        System.out.println(imageFolder);
        List<Path> paths = Files.list(imageFolder).toList();
        Path path = paths.get(random.nextInt(0, 14));
        Resource resource = new ClassPathResource("images/" + path.getFileName().toString());
        byte[] imageData = Files.readAllBytes(path);
        ImageUploadResponse savedImage =
                imageService.uploadImage(imageData, resource.getFilename(), "image/png");
        return savedImage.id();
    }
}
