import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { IProfile } from "../Profile/components/ProfileInterfaces";
import { Section } from "../Profile/components/Section";
import { Match } from "./Match";

export const Matches = () => {
    const [matches, setMatches] = useState<IProfile[]>();
    useEffect(() => {
        ApiService.get(`/profiles/matches`)
            .then((response) => {
                setMatches(response.data), console.log(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="flex items-center justify-center">
            <Section label={"match-container"} style={"bg-blue-300"}>
                <h1 className="tracking-wider font-bold text-2xl">Matches</h1>
                <ul className="w-full">
                    {matches ? (
                        matches.map((match) => (
                            <Match key={match.id} match={match} />
                        ))
                    ) : (
                        <p>No Matches</p>
                    )}
                </ul>
            </Section>
        </div>
    );
};
