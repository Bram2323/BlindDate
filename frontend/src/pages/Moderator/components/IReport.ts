export interface IReport {
    id: number;
    reportMessage: string;
    reportedUserId: string;
    reportedUsername: string;
    reportedBy: string;
    reportedOn: string;
    isClosed: boolean;
    moderatorDetails: String[];
}
