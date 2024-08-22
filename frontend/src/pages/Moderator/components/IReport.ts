export interface IReport {
    id: number;
    reportMessage: string;
    reportedProfileId: number;
    reportedBy: string;
    reportedOn: string;
    isClosed: boolean;
    moderatorDetails: String[];
}
