import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-purple-300 flex justify-between">
                <button
                    className="text-4xl text-white hover:bg-purple-500 px-2 mx-2 my-2 rounded"
                    onClick={() => navigate("/")}
                >
                    Blind Date
                </button>
                <div className="flex text-xl">
                    <button
                        className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 mx-4 my-4 rounded"
                        onClick={() => navigate("/login")}
                    >
                        Inloggen
                    </button>
                    <button
                        className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 ml-4 mr-8 my-4 rounded"
                        onClick={() => navigate("/register")}
                    >
                        Registreren
                    </button>
                </div>
                {/* If user logged in = true:
                <div className="flex text-xl">
                    <button
                        className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 mx-4 my-4 rounded">
                        onClick={goToAccount()}
                        Account
                    </button>
                    <button
                        className="bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 ml-4 mr-8 my-4 rounded">
                        onClick={deleteJwtToken()}
                        Uitloggen
                    </button>
                </div> */}
            </div>
        </>
    );
}

export default NavBar;
