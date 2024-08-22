import { useNavigate } from "react-router-dom";
import { useUser, logout } from "../services/UserService";

function NavBar() {
    const navigate = useNavigate();

    const [user, isLoggedIn] = useUser();
    return (
        <>
            <div className="bg-purple-300 flex justify-between">
                <div className="flex">
                    <button
                        className="text-4xl text-white hover:bg-purple-500 px-2 mx-2 my-2 rounded"
                        onClick={() => navigate("/")}
                    >
                        Blind Date
                    </button>

                    {user.role === "ROLE_ADMIN" && (
                        <button
                            className="text-xl bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 mx-4 my-4 rounded"
                            onClick={() => navigate("/admin/users")}
                        >
                            Admin
                        </button>
                    )}

                    {(user.role == "ROLE_MODERATOR" ||
                        user.role == "ROLE_ADMIN") && (
                        <button
                            className="text-xl bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 mx-4 my-4 rounded"
                            onClick={() => navigate("/moderator")}
                        >
                            Reports
                        </button>
                    )}
                </div>

                <div className="flex text-xl">
                    {!isLoggedIn ? (
                        <>
                            <button
                                className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 mx-4 my-4 rounded shadow-xl"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 ml-4 mr-8 my-4 rounded shadow-xl"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 ml-4 mr-8 my-4 rounded shadow-xl"
                                onClick={() => navigate("/")}
                            >
                                Chats
                            </button>
                            <button
                                className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 ml-4 mr-8 my-4 rounded shadow-xl"
                                onClick={() => navigate("/judging")}
                            >
                                Matchmaking
                            </button>
                            <button
                                className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 mx-4 my-4 rounded shadow-xl"
                                onClick={() => navigate("/profile")}
                            >
                                Account
                            </button>
                            <button
                                className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 ml-4 mr-8 my-4 rounded shadow-xl"
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default NavBar;
