import { useEffect, useState } from "react";
import { LabelBox } from "../Profile/components/LabelBox";
import { Section } from "../Profile/components/Section";
import ApiService from "../../services/ApiService";
import { IReport } from "./components/IReport";
import { Report } from "./components/Report";
import { Button } from "../../generic/Button";

export const ModeratorPage = () => {
    const [openReports, setOpenReports] = useState<IReport[]>([]);
    const [closedReports, setClosedReports] = useState<IReport[]>([]);
    const [showOpen, setShowOpen] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        ApiService.get("/reports")
            .then((response) => {
                const open = response.data.filter(
                    (report: IReport) => !report.isClosed
                );
                setOpenReports(sortById(open));

                const closed = response.data.filter(
                    (report: IReport) => report.isClosed
                );
                setClosedReports(sortById(closed));
            })
            .catch((error) => console.error(error));
    }, [refresh]);

    const toggleShowOpen = () => {
        setShowOpen(!showOpen);
    };

    const sortById = (list: IReport[]) => {
        return list.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Section label={"start"} style={"bg-yellow-300 py-16"}>
                <LabelBox content="Welcome to the Janitor's Lounge!" />
                <Button
                    content={`${
                        showOpen ? "show Closed Reports" : "show Open Reports"
                    }`}
                    handleClick={toggleShowOpen}
                    style={"mt-8"}
                />
            </Section>

            {showOpen ? (
                <Section label={"open-reports"} style={"bg-green-300 gap-4"}>
                    <LabelBox content={"Open Reports"} />
                    {openReports &&
                        openReports.map((report) => (
                            <Report
                                report={report}
                                key={report.id}
                                updatePage={() => {
                                    setRefresh(!refresh);
                                }}
                            />
                        ))}
                </Section>
            ) : (
                <Section label={"closed-reports"} style={"bg-blue-300 gap-4"}>
                    <LabelBox content={"Closed Reports"} />
                    {closedReports &&
                        closedReports.map((report) => (
                            <Report
                                report={report}
                                key={report.id}
                                updatePage={() => {
                                    setRefresh(!refresh);
                                }}
                            />
                        ))}
                </Section>
            )}
        </div>
    );
};
