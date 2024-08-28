import { useNavigate } from "react-router-dom";
import { useUser } from "../services/UserService";
import Logo from "../../src/assets/Logos/2.png";
import { NavigationLink } from "./NavigationLink";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";

function NavBar() {
    const navigate = useNavigate();
    const [user, isLoggedIn] = useUser();
    const [showNav, setShowNav] = useState<boolean>(false);

    return (
        <>
            <nav className="bg-purple-300 flex items-center justify-between px-4 py-2 relative shadow-lg">
                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-2 text-4xl font-bold text-white hover:bg-purple-400 p-2 mx-2 my-2 rounded transition"
                        onClick={() => navigate("/")}
                    >
                        <img src={Logo} className="h-8" alt="Blind Date Logo" />
                        Blind Date
                    </button>
                </div>

                <div
                    id="burger-menu"
                    className="lg:hidden ml-auto cursor-pointer p-2 rounded hover:bg-purple-500"
                    onClick={() => setShowNav(!showNav)}
                >
                    <FaHamburger className="text-4xl text-white" />
                </div>

                <ul
                    id="regular-menu"
                    className={"hidden lg:flex items-center gap-4"}
                >
                    {user.role === "ROLE_ADMIN" && (
                        <NavigationLink label={"Admin"} url={"/admin/users"} />
                    )}

                    {(user.role === "ROLE_MODERATOR" ||
                        user.role === "ROLE_ADMIN") && (
                        <NavigationLink label={"Reports"} url={"/moderator"} />
                    )}

                    {!isLoggedIn ? (
                        <>
                            <NavigationLink label={"Login"} url={"/login"} />
                            <NavigationLink
                                label={"Register"}
                                url={"/register"}
                            />
                        </>
                    ) : (
                        <>
                            <NavigationLink label={"Chat"} url={"/"} />
                            <NavigationLink
                                label={"Matches"}
                                url={"/matches"}
                            />
                            <NavigationLink label={"Browse"} url={"/judging"} />
                            <NavigationLink
                                label={"Profile"}
                                url={"/profile"}
                            />
                            <NavigationLink
                                label={"Logout"}
                                url={"/"}
                                logoutUser={true}
                            />
                        </>
                    )}
                </ul>
            </nav>

            {showNav && (
                <div
                    id={"small-screen-menu"}
                    className={
                        "bg-purple-300 absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center z-50 p-4"
                    }
                >
                    <button
                        className="absolute top-4 right-4 text-3xl text-black"
                        onClick={() => setShowNav(false)}
                    >
                        ❌
                    </button>
                    <ul className="flex flex-col gap-4 w-full">
                        {user.role === "ROLE_ADMIN" && (
                            <NavigationLink
                                label={"Admin"}
                                url={"/admin/users"}
                                hideAfterNav={() => setShowNav(false)}
                            />
                        )}

                        {(user.role === "ROLE_MODERATOR" ||
                            user.role === "ROLE_ADMIN") && (
                            <NavigationLink
                                label={"Reports"}
                                url={"/moderator"}
                                hideAfterNav={() => setShowNav(false)}
                            />
                        )}

                        {!isLoggedIn ? (
                            <>
                                <NavigationLink
                                    label={"Login"}
                                    url={"/login"}
                                    hideAfterNav={() => setShowNav(false)}
                                />
                                <NavigationLink
                                    label={"Register"}
                                    url={"/register"}
                                    hideAfterNav={() => setShowNav(false)}
                                />
                            </>
                        ) : (
                            <>
                                <NavigationLink
                                    label={"Chat"}
                                    url={"/"}
                                    hideAfterNav={() => setShowNav(false)}
                                />
                                <NavigationLink
                                    label={"Matches"}
                                    url={"/matches"}
                                    hideAfterNav={() => setShowNav(false)}
                                />
                                <NavigationLink
                                    label={"Browse"}
                                    url={"/judging"}
                                    hideAfterNav={() => setShowNav(false)}
                                />
                                <NavigationLink
                                    label={"Profile"}
                                    url={"/profile"}
                                    hideAfterNav={() => setShowNav(false)}
                                />
                                <NavigationLink
                                    label={"Logout"}
                                    url={"/"}
                                    logoutUser={true}
                                    hideAfterNav={() => setShowNav(false)}
                                />
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
}

export default NavBar;
