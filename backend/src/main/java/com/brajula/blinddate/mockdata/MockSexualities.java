package com.brajula.blinddate.mockdata;

import com.brajula.blinddate.entities.sexuality.Sexuality;

import java.util.List;

public class MockSexualities {
    public static final List<Sexuality> SEXUALITIES =
            List.of(
                    (new Sexuality("Heterosexual")), // tegenovergestelde geslacht
                    (new Sexuality("Homosexual")), // hetzelfde geslacht
                    (new Sexuality("Bisexual")), // beide geslachten
                    (new Sexuality("Pansexual")), // ongeacht geslacht
                    (new Sexuality("Asexual")), // staat los van geslacht, dus geen filter?
                    (new Sexuality("Demisexual")), // alle genders
                    (new Sexuality("Omnisexual")), // alle genders
                    (new Sexuality("Sexual Fluidity")), // varierend, dus geen filter?
                    (new Sexuality(
                            "Androsexual")), // mannelijkheid of mannelijke kenmerken. dus any?
                    (new Sexuality(
                            "Gynosexual")), //  vrouwelijkheid of vrouwelijke kenmerken, ook any?
                    (new Sexuality("Graysexual")), // variant van aseksueel dus geen filter?
                    (new Sexuality("Skoliosexual")), // nonbinary mensen
                    (new Sexuality(
                            "Polysexual"))); // meerdere maar niet alle genders, welke filter?
}
