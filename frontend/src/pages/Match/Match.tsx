import { Button } from "../../generic/Button";
import { IProfile } from "../Profile/components/ProfileInterfaces";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

export const Match: React.FC<MatchProps> = ({ match }) => {
    const navigate = useNavigate();
    const startNewChat = (id: string) => {
        console.log("Starting new chat");
        ApiService.post(`chats/new/${id}`, {})
            .then((response) => console.log(response))
            .then(() => {
                navigate(`/chat`);
            })
            .catch((error) => console.error(error));
    };
    return (
        <li
            className="flex flex-row p-4 gap-12 w-full border-b-2 justify-center items-center"
            key={match.id}
        >
            <p className="tracking-wider font-bold bg-green-600 px-4 py-2 rounded-lg text-white">
                {match.username}
            </p>
            <Button
                content={"Start chat"}
                handleClick={() => {
                    startNewChat(match.userId);
                }}
            />
        </li>
    );
};

interface MatchProps {
    match: IProfile;
}
