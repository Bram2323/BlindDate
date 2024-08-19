import { useUser } from "../../services/UserService";
import { Section } from "../Profile/components/Section";
import PersonalHome from "./PersonalHome/PersonalHome";
import AppLogo from "../../assets/Logos/2.png";
import TeamLogo from "../../assets/Logos/5.png";

export const Home = () => {
    const [user, isLoggedIn] = useUser();

    return (
        <>
            <div className="flex flex-col h-full justify-center items-center p-4">
                {isLoggedIn ? (
                    <>
                        <PersonalHome userId={user.id} />
                    </>
                ) : (
                    <>
                        <Section label={"home-page"}>
                            <img src={AppLogo} alt="app logo" />
                        </Section>

                        <Section label={"about the app"}>
                            <h1>What is this app about?</h1>
                            <p>
                                Blind Date is a dating app that let's you
                                connect on a deeper level. Swipe through photo's
                                without being influenced by photo's, here it is
                                all about personality and meaningfull
                                conversations. When you match you can start
                                chatting right away, and as your connection
                                grows so does the clarity of your match's
                                appearance. With Blind Date is all about
                                substance.
                            </p>
                            <p>
                                In today's digital age, privacy is more
                                important than ever. Many dating apps expose
                                your photos, location and personal details right
                                from the start for everyone to see. This van
                                geel intrusive and even unsafe. Wether you are a
                                public figure, just someone who values their
                                privacy or someone that wants to avoid all that
                                superficiality of dating apps, Blind Date has
                                got you covered!
                            </p>
                        </Section>
                        <Section label={"who are we?"}>
                            <img src={TeamLogo} alt="team logo" />
                        </Section>
                    </>
                )}
            </div>
        </>
    );
};
