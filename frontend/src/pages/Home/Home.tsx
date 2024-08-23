import { useUser } from "../../services/UserService";
import { Section } from "../Profile/components/Section";
import PersonalHome from "./PersonalHome/PersonalHome";
import AppLogo from "../../assets/Logos/2.png";
import TeamLogo from "../../assets/Logos/5.png";
import { LabelBox } from "../Profile/components/LabelBox";

export const Home = () => {
    const [user, isLoggedIn] = useUser();

    return (
        <>
            <div className="flex flex-col min-h-full h-fit justify-center items-center p-4">
                {isLoggedIn ? (
                    <>
                        <PersonalHome userId={user.id} />
                    </>
                ) : (
                    <>
                        <Section label={"home-page"} style={"bg-pink-300"}>
                            <img src={AppLogo} alt="app logo" />
                        </Section>

                        <Section label={"about the app"} style={"bg-green-300"}>
                            <LabelBox content={"What is this app about?"} />
                            <p className="p-2 tracking-wider">
                                Blind Date is a dating app that let's you
                                connect on a deeper level. Swipe through
                                profiles without being influenced by photo's,
                                here it is all about personality and meaningfull
                                conversations. When you match you can start
                                chatting right away, and as your connection
                                grows so does the clarity of your match's
                                appearance. With Blind Date it is all about
                                substance.
                            </p>
                            <p className="p-2 tracking-wider">
                                In today's digital age, privacy is more
                                important than ever. Many dating apps expose
                                your photos, location and personal details right
                                from the start for everyone to see. This can
                                feel intrusive and even unsafe. Wether you are a
                                public figure, just someone who values their
                                privacy or someone that wants to avoid all that
                                superficiality of dating apps, Blind Date has
                                got you covered!
                            </p>
                        </Section>
                        <Section label={"who are we?"} style={"bg-blue-300"}>
                            <LabelBox content={"Who are we?"} />
                            <p className="p-2 tracking-wider">
                                We are a passionate team of software developers
                                dedicated to creating innovative and meaningful
                                digital experiences.{" "}
                            </p>
                            <img src={TeamLogo} alt="team logo" />
                        </Section>
                    </>
                )}
            </div>
        </>
    );
};
