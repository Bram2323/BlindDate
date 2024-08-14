package com.brajula.blinddate;

import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.trait.Trait;
import com.brajula.blinddate.entities.user.SeedUsersDto;

import java.util.List;

public class MockData {
    // users
    public static final List<SeedUsersDto> USERS =
            List.of(
                    new SeedUsersDto(
                            "Charlamagne",
                            "securePassword1!",
                            "Charlie",
                            "Magnificent",
                            "champagne_papi@gmail.com"),
                    new SeedUsersDto(
                            "AlexanderTheGreat",
                            "securePassword1!",
                            "Alexander",
                            "Great",
                            "alexander_great@gmail.com"),
                    new SeedUsersDto(
                            "GenghisKhan",
                            "securePassword1!",
                            "Genghis",
                            "Khan",
                            "genghis_khan@gmail.com"),
                    new SeedUsersDto(
                            "JuliusCaesar",
                            "securePassword1!",
                            "Julius",
                            "Caesar",
                            "julius_caesar@gmail.com"),
                    new SeedUsersDto(
                            "NapoleonBonaparte",
                            "securePassword1!",
                            "Napoleon",
                            "Bonaparte",
                            "napoleon_bonaparte@gmail.com"),
                    new SeedUsersDto(
                            "Cleopatra",
                            "securePassword1!",
                            "Cleo",
                            "Patra",
                            "cleo_patra@gmail.com"),
                    new SeedUsersDto(
                            "Saladin", "securePassword1!", "Salah", "Din", "saladin@gmail.com"),
                    new SeedUsersDto(
                            "SuleimanTheMagnificent",
                            "securePassword1!",
                            "Suleiman",
                            "Magnificent",
                            "suleiman_magnificent@gmail.com"),
                    new SeedUsersDto(
                            "ElizabethI",
                            "securePassword1!",
                            "Elizabeth",
                            "Tudor",
                            "elizabeth_tudor@gmail.com"),
                    new SeedUsersDto(
                            "KingArthur",
                            "securePassword1!",
                            "Arthur",
                            "Pendragon",
                            "king_arthur@gmail.com"));
    // interests
    public static final List<Interest> INTERESTS =
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

    // sexualities //TODO BESPREKEN MET BRAM EN JULIAN OF ZE DIT EEN LEUK ALTERNATIEF VINDEN?
    public static final List<Sexuality> SEXUALITIES =
            List.of(
                    new Sexuality("Integrity"),
                    new Sexuality("Respect"),
                    new Sexuality("Courage"),
                    new Sexuality("Humility"),
                    new Sexuality("Compassion"),
                    new Sexuality("Accountability"),
                    new Sexuality("Generosity"),
                    new Sexuality("Perseverance"),
                    new Sexuality("Gratitude"),
                    new Sexuality("Wisdom"),
                    new Sexuality("Fairness"),
                    new Sexuality("Kindness"),
                    new Sexuality("Optimism"),
                    new Sexuality("Independence"),
                    new Sexuality("Authenticity"),
                    new Sexuality("Balance"),
                    new Sexuality("Creativity"),
                    new Sexuality("Ambition"),
                    new Sexuality("Innovation"),
                    new Sexuality("Trustworthiness"));
    /*
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
    */

    // traits
    public static final List<Trait> TRAITS =
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
}
