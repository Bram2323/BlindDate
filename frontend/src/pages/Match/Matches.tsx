import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { Section } from "../Profile/components/Section";
import { Match } from "./Match";
import { IMatch } from "./IMatch";
import { useNavigate } from "react-router-dom";
import { Button } from "../../generic/Button";
import { LabelBox } from "../Profile/components/LabelBox";

export const Matches = () => {
    const [matches, setMatches] = useState<IMatch[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        ApiService.get(`/profiles/matches`)
            .then((response) => {
                const openMatches = response.data.filter(
                    (match: IMatch) => !match.hasOpenChat
                );
                setMatches(openMatches);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="flex justify-center">
            <Section label={"match-container"} style={"bg-blue-300"}>
                <LabelBox content={"Matches"} style={"w-full text-2xl"} />
                <ul className="w-full flex flex-col gap-2">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <Match key={match.matchId} match={match} />
                        ))
                    ) : (
                        <div className="flex items-center justify-center">
                            <p className="tracking-wider text-center p-4">
                                You have no matches
                            </p>
                            <Button
                                content={"Browse"}
                                handleClick={() => navigate("/judging")}
                            />
                        </div>
                    )}
                </ul>
            </Section>
        </div>
    );
};
