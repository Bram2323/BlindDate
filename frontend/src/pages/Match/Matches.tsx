import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { Section } from "../Profile/components/Section";
import { Match } from "./Match";
import { IMatch } from "./IMatch";

export const Matches = () => {
    const [matches, setMatches] = useState<IMatch[]>([]);
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
        <div className="flex items-center justify-center">
            <Section label={"match-container"} style={"bg-blue-300 "}>
                <h1 className="tracking-wider font-bold text-2xl">Matches</h1>
                <ul className="w-full">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <Match key={match.matchId} match={match} />
                        ))
                    ) : (
                        <p className="tracking-wider text-center p-4">
                            No Matches yet...
                        </p>
                    )}
                </ul>
            </Section>
        </div>
    );
};
