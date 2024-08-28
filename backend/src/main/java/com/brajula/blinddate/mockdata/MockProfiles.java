package com.brajula.blinddate.mockdata;

import com.brajula.blinddate.entities.profile.Gender;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

public class MockProfiles {
    // profile
    private static final Random RANDOM = new Random();

    private static Gender getRandomGender() {
        return Gender.values()[RANDOM.nextInt(Gender.values().length)];
    }

    // todo deze gaat niet helemaal goed, op dubbele waardes checken.
    private static List<Gender> getRandomGenderList() {
        return List.of(getRandomGender(), getRandomGender());
    }

    public static final List<SeedProfileDto> PROFILES =
            List.of(
                    new SeedProfileDto(
                            "Passionate about technology and innovation. Always eager to learn and explore new advancements.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1988, 3, 10),
                            18,
                            99),
                    new SeedProfileDto(
                            "Artistic soul who loves painting and visiting galleries. Looking for someone to share creative experiences with.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1995, 7, 25),
                            18,
                            99),
                    new SeedProfileDto(
                            "Fitness enthusiast who enjoys running and healthy living. Seeking a partner who values a balanced lifestyle.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1990, 11, 30),
                            18,
                            99),
                    new SeedProfileDto(
                            "Travel lover who has a passion for discovering new cultures and cuisines. Interested in finding someone with a similar wanderlust.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1983, 5, 5),
                            18,
                            99),
                    new SeedProfileDto(
                            "Dedicated to environmental causes and sustainability. Looking for a like-minded individual to share green initiatives.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1992, 2, 20),
                            18,
                            99),
                    new SeedProfileDto(
                            "Tech-savvy and enjoys gaming and programming. Searching for someone who shares a love for digital worlds and tech discussions.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1994, 6, 15),
                            18,
                            99),
                    new SeedProfileDto(
                            "Bookworm with a love for literature and storytelling. Looking for a companion who appreciates quiet evenings with a good book.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1987, 9, 10),
                            18,
                            99),
                    new SeedProfileDto(
                            "Music lover who enjoys attending concerts and discovering new artists. Seeking a partner to share musical experiences and interests.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1996, 12, 8),
                            18,
                            99),
                    new SeedProfileDto(
                            "Foodie who loves experimenting with recipes and exploring new restaurants. Interested in finding someone to share culinary adventures.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1989, 4, 18),
                            18,
                            99),
                    new SeedProfileDto(
                            "Adventurous spirit with a passion for hiking and outdoor activities. Looking for someone to join in on thrilling adventures.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1991, 10, 2),
                            18,
                            99),
                    new SeedProfileDto(
                            "Enthusiastic about science and research. Always curious and looking for someone who enjoys deep conversations and intellectual pursuits.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1986, 4, 22),
                            18,
                            99),
                    new SeedProfileDto(
                            "Creative writer who enjoys crafting stories and poetry. Seeking someone to share in the magic of words and imaginative adventures.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1990, 1, 15),
                            18,
                            99),
                    new SeedProfileDto(
                            "Nature lover who enjoys gardening and wildlife photography. Looking for a partner who shares a passion for the great outdoors and conservation.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1985, 8, 19),
                            18,
                            99),
                    new SeedProfileDto(
                            "Film buff with a penchant for classic cinema and independent films. Interested in finding someone to enjoy movie nights and film discussions.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1993, 7, 12),
                            18,
                            99),
                    new SeedProfileDto(
                            "Passionate cook who loves experimenting with global cuisines. Seeking someone to share recipes, meals, and culinary experiences.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1988, 11, 3),
                            18,
                            99),
                    new SeedProfileDto(
                            "Yoga practitioner who values mindfulness and a healthy mind-body connection. Looking for a partner who enjoys a peaceful and balanced lifestyle.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1992, 5, 7),
                            18,
                            99),
                    new SeedProfileDto(
                            "History enthusiast who enjoys exploring historical sites and reading about the past. Seeking someone to share in the fascination of history and culture.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1981, 9, 25),
                            18,
                            99),
                    new SeedProfileDto(
                            "DIY and crafting aficionado who loves hands-on projects. Looking for a creative partner to share in building and making new things.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1994, 2, 14),
                            18,
                            99),
                    new SeedProfileDto(
                            "Animal lover with a special fondness for dogs and cats. Interested in finding someone who shares a love for pets and animal care.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1989, 10, 30),
                            18,
                            99),
                    new SeedProfileDto(
                            "Fitness trainer who enjoys helping others achieve their health goals. Seeking a partner who values personal growth and wellness.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1987, 12, 5),
                            18,
                            99),
                    new SeedProfileDto(
                            "Photography enthusiast with a knack for capturing beautiful moments. Looking for someone to share in the joy of taking and appreciating photos.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1991, 6, 1),
                            18,
                            99),
                    new SeedProfileDto(
                            "Comedy lover with a great sense of humor. Seeking a partner who enjoys laughter and doesn't take life too seriously.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1993, 11, 11),
                            18,
                            99),
                    new SeedProfileDto(
                            "Travel blogger who loves sharing experiences and stories from around the world. Looking for a companion to explore new destinations and create memories.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1984, 3, 17),
                            18,
                            99),
                    new SeedProfileDto(
                            "Sociable and outgoing individual who enjoys hosting events and social gatherings. Seeking someone who appreciates a lively social life and making new friends.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1995, 8, 23),
                            18,
                            99),
                    new SeedProfileDto(
                            "Craft beer enthusiast with a passion for brewing and tasting. Interested in finding someone to share in the exploration of unique and artisanal beers.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1986, 4, 10),
                            18,
                            99),
                    new SeedProfileDto(
                            "Enthusiastic gamer who enjoys multiplayer games and strategy. Looking for a partner who shares an interest in gaming and tech.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1992, 7, 20),
                            18,
                            99),
                    new SeedProfileDto(
                            "Spiritual individual who enjoys meditation and holistic practices. Seeking a partner who values inner peace and personal growth.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1988, 1, 9),
                            18,
                            99),
                    new SeedProfileDto(
                            "Volunteer who is deeply committed to community service and helping others. Looking for someone who shares a passion for making a positive impact.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1987, 11, 22),
                            18,
                            99),
                    new SeedProfileDto(
                            "Entrepreneur with a passion for business innovation and startups. Seeking a partner who is also driven and enjoys discussing new ideas.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1990, 6, 6),
                            18,
                            99),
                    new SeedProfileDto(
                            "Gardening enthusiast who loves growing plants and creating beautiful outdoor spaces. Interested in finding someone who shares a green thumb and love for nature.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1994, 4, 13),
                            18,
                            99),
                    new SeedProfileDto(
                            "Tech entrepreneur with a focus on digital transformation. Looking for a partner who is forward-thinking and enjoys discussing technological advancements.",
                            Gender.NONBINARY,
                            getRandomGenderList(),
                            LocalDate.of(1985, 12, 18),
                            18,
                            99),
                    new SeedProfileDto(
                            "Sports fan with a love for team games and athletic events. Seeking someone to share in the excitement of games and fitness activities.",
                            Gender.MALE,
                            getRandomGenderList(),
                            LocalDate.of(1991, 10, 14),
                            18,
                            99),
                    new SeedProfileDto(
                            "Theater lover who enjoys live performances and dramatic arts. Looking for a companion to share in the excitement of stage shows and cultural experiences.",
                            Gender.FEMALE,
                            getRandomGenderList(),
                            LocalDate.of(1993, 2, 27),
                            18,
                            99));
}
