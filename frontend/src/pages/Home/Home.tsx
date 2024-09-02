import { useUser } from "../../services/UserService";
import { Section } from "../Profile/components/Section";
import PersonalHome from "./PersonalHome/PersonalHome";
import AppLogo from "../../assets/Logos/2.png";
import TeamLogo from "../../assets/Logos/5.png";
import { LabelBox } from "../Profile/components/LabelBox";
import { Button } from "../../generic/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [user, isLoggedIn] = useUser();
    const navigate = useNavigate();

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

                        <Section
                            label={"about the app"}
                            style={"bg-green-300 min-h-96"}
                        >
                            <LabelBox
                                content={"What is this app about?"}
                                style={"w-full border-none"}
                            />
                            <p className="p-4 text-center">
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
                            <Button
                                content={"Register"}
                                handleClick={() => navigate("/register")}
                            />
                        </Section>
                        <Section
                            label={"who are we?"}
                            style={"bg-blue-300 min-h-96"}
                        >
                            <p className="p-4 text-center">
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
