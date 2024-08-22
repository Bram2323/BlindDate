import React, { useState } from "react";
import { Button } from "../../../generic/Button";
import { TextArea } from "../../Profile/components/TextArea";
import ApiService from "../../../services/ApiService";

export const Report: React.FC<ReportProps> = ({ profileId }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [reportMsg, setReportMsg] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);

    const submitReport = () => {
        if (reportMsg == "") {
            return;
        }
        ApiService.post("/reports", {
            reportMessage: reportMsg,
            profileId: profileId,
        }).then((response) => {
            if (response.status == 201) {
                setCompleted(true);
                setTimeout(() => {
                    setReportMsg("");
                    setIsOpen(false);
                    setCompleted(false);
                }, 2500);
            }
        });
    };

    return (
        <div
            className={`${
                isOpen ? "border-2" : ""
            } absolute right-0 top-0 rounded-lg border-gray-800`}
        >
            {isOpen ? (
                <div className="bg-gray-300 p-10 rounded-lg flex flex-col">
                    {completed ? (
                        <p className="font-bold tracking-wider">
                            Thank you for keeping this app safe!
                        </p>
                    ) : (
                        <>
                            <Button
                                content={"Close"}
                                style={"bg-red-500 hover:bg-red-600"}
                                handleClick={() => {
                                    setIsOpen(false);
                                }}
                            />
                            <div className="flex flex-col items-center justify-center py-2">
                                <p className="font-bold tracking-wider pt-2">
                                    Reason for reporting:
                                </p>
                                <TextArea
                                    handleChange={(value) => {
                                        setReportMsg(value);
                                    }}
                                />
                                <Button
                                    content={"Submit"}
                                    handleClick={submitReport}
                                />
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <Button
                    content={"Report"}
                    style={"bg-red-500 hover:bg-red-600"}
                    handleClick={() => {
                        setIsOpen(true);
                    }}
                />
            )}
        </div>
    );
};

interface ReportProps {
    profileId: number;
}
