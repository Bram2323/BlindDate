import { useEffect, useState } from "react";
import { LabelBox } from "../Profile/components/LabelBox";
import { Section } from "../Profile/components/Section";
import ApiService from "../../services/ApiService";

export const ModeratorPage = () => {
    const [reports, setReports] = useState<{}>();

    useEffect(() => {
        ApiService.get("/reports").then((response) => {
            setReports(response.data), console.log(response.data);
        });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <Section label={"start"} style={"bg-yellow-300"}>
                <LabelBox content="Welcome to the Janitor's Lounge!" />
            </Section>

            <Section label={"reports"} style={"bg-green-300 gap-2"}>
                <LabelBox content={"Reports"} />
                {reports &&
                    reports.map((report) => (
                        <div
                            key={report.id}
                            className="rounded-lg bg-white p-10"
                        >
                            <p className="font-bold border-b-2">Report:</p>
                            <p>{report.reportMessage}</p>
                            <p className="font-bold border-b-2">Reported by:</p>
                            <p>{report.reportedBy}</p>
                            <p className="font-bold border-b-2">Reported on:</p>
                            <p>{report.reportedOn}</p>
                            <p className="font-bold border-b-2">Status:</p>
                            <p>{report.isClosed ? "Closed" : "Open"}</p>
                            <p className="font-bold border-b-2">
                                Moderator Details
                            </p>
                            <p>{report.moderatorDetails}</p>
                        </div>
                    ))}
            </Section>
        </div>
    );
};
