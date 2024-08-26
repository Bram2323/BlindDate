import React, { useEffect, useState } from "react";
import { IReport } from "./IReport";
import FieldInput from "../../../generic/FieldInput";
import { Button } from "../../../generic/Button";
import ApiService from "../../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../services/UserService";

export const Report: React.FC<ReportProps> = ({ report, updatePage }) => {
    const [modMessage, setModMessage] = useState<string>("");
    const [user, loggedIn] = useUser();
    const navigate = useNavigate();

    const submitModMessage = () => {
        ApiService.patch(`/reports/${report.id}`, {
            moderatorDetails: [`${user.username}: ${modMessage}`],
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

    useEffect(() => {}, [modMessage]);
    return (
        <div className="rounded-lg bg-white p-10 w-full h-fit shadow-lg">
            <div className="flex flex-row items-center justify-between">
                {!report.isClosed && (
                    <Button
                        content={"Close report"}
                        handleClick={closeReport}
                        style={"bg-red-400 hover:bg-red-600"}
                    />
                )}
            </div>

            <p className="font-bold p-2">Reported user:</p>
            <p
                className="p-2 cursor-pointer text-blue-700 underline"
                onClick={() => {
                    navigate(`/admin/users/${report.reportedUserId}`);
                }}
            >
                {report.reportedUsername}
            </p>

            <p className="font-bold p-2">Report:</p>
            <p className="p-2">{report.reportMessage}</p>

            <p className="font-bold p-2">Reported by:</p>
            <p className="p-2">{report.reportedBy}</p>

            <p className="font-bold p-2">Reported on:</p>
            <p className="p-2">{report.reportedOn}</p>

            <p className="font-bold p-2">Status:</p>
            <p className="p-2">{report.isClosed ? "Closed" : "Open"}</p>

            <p className="font-bold p-2">Moderator Details</p>
            {report.moderatorDetails.map((detail, index) => (
                <p className="p-2" key={index}>
                    {detail}
                </p>
            ))}
            {!report.isClosed && (
                <div className="flex flex-col items-center gap-4">
                    <p className="p-2">Add mod Message</p>
                    <FieldInput
                        style={"border-none"}
                        content={modMessage}
                        handleChange={(value) => setModMessage(value)}
                    />
                    <Button content={"add"} handleClick={submitModMessage} />
                </div>
            )}
        </div>
    );
};

interface ReportProps {
    report: IReport;
    updatePage: () => void;
}
