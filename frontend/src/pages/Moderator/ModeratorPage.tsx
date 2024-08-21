import { LabelBox } from "../Profile/components/LabelBox";
import { Section } from "../Profile/components/Section";

export const ModeratorPage = () => {
    return (
        <div className="flex justify-center">
            <Section label={"start"} style={"bg-yellow-300"}>
                <LabelBox content="Welcome to the Janitor's Lounge!" />
            </Section>
        </div>
    );
};
