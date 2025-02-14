import { Button } from "../../generic/Button";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { IMatch } from "./IMatch";

export const Match: React.FC<MatchProps> = ({ match }) => {
    const navigate = useNavigate();
    const startNewChat = (id: string) => {
        ApiService.post(`chats/new/${id}`, {})
            .then(() => {
                navigate(`/`);
            })
            .catch(() => navigate(`/`));
    };
    return (
        <li
            className=" bg-blue-200 flex flex-row p-4 gap-12 w-full justify-between rounded-lg"
            key={match.matchId}
        >
            <p className="tracking-wider font-bold text-xl px-4 py-2 rounded-lg capitalize">
                {match.matchUsername}
            </p>
            <Button
                content={"Start chat"}
                handleClick={() => {
                    startNewChat(match.matchId);
                }}
            />
        </li>
    );
};

interface MatchProps {
    match: IMatch;
}
