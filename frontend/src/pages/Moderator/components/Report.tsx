import React, { useEffect, useState } from "react";
import { IReport } from "./IReport";
import FieldInput from "../../../generic/FieldInput";
import { Button } from "../../../generic/Button";
import ApiService from "../../../services/ApiService";
import { useNavigate } from "react-router-dom";

export const Report: React.FC<ReportProps> = ({ report, updatePage }) => {
    const [modMessage, setModMessage] = useState<string>("");
    const navigate = useNavigate();

    const submitModMessage = () => {
        ApiService.patch(`/reports/${report.id}`, {
            moderatorDetails: [modMessage],
        })
            .then(updatePage)
            .then(() => {
                setModMessage("");
            })
            .catch((error) => console.error(error));
    };

    const closeReport = () => {
        ApiService.patch(`/reports/${report.id}`, { isClosed: true })
            .then(updatePage)
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        console.log(report);
    }, [modMessage]);

    return (
        <div className="rounded-lg bg-white p-10 w-3/4 h-fit">
            <p className="font-bold p-2">Report:</p>
            <p className="p-2">{report.reportMessage}</p>

            <p className="font-bold p-2">Reported by:</p>
            <p className="p-2">{report.reportedBy}</p>

            <p className="font-bold p-2">Reported on:</p>
            <p className="p-2">{report.reportedOn}</p>

            <p className="font-bold p-2">Status:</p>
            <div className="h-16 flex flex-row justify-between items-center">
                <p className="p-2">{report.isClosed ? "Closed" : "Open"}</p>
                {!report.isClosed && (
                    <Button
                        content={"Close report"}
                        handleClick={closeReport}
                        style={"bg-red-400 hover:bg-red-600"}
                    />
                )}
            </div>

            <p className="font-bold p-2">Moderator Details</p>
            {report.moderatorDetails.map((detail, index) => (
                <p className="p-2" key={index}>
                    {detail}
                </p>
            ))}

            <div className="flex flex-row items-center gap-4">
                <p className="p-2">Add mod Message</p>
                <FieldInput
                    style={"border-none"}
                    content={modMessage}
                    handleChange={(value) => setModMessage(value)}
                />
                <Button content={"add"} handleClick={submitModMessage} />
            </div>

            <div className="flex flex-row items-center gap-4">
                <Button
                    content={"Go to Reported Profile"}
                    handleClick={() => {
                        // navigate(`/users/${report.reportedProfileId}`);
                        // TODO even uitvogelen hoe alles in elkaar zit
                    }}
                />
            </div>
        </div>
    );
};

interface ReportProps {
    report: IReport;
    updatePage: () => void;
}
