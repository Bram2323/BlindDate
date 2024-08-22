package com.brajula.blinddate.entities.report;

import java.time.LocalDate;
import java.util.List;

// reported by = username

public record GetReportDto(
        Long id,
        String reportMessage,
        Long reportedProfileId,
        List<String> moderatorDetails,
        LocalDate reportedOn,
        Boolean isClosed,
        String reportedBy) {

    public static GetReportDto from(Report report) {
        return new GetReportDto(
                report.getId(),
                report.getReportMessage(),
                report.getReportedProfile().getId(),
                report.getModeratorDetails(),
                report.getReportedOn(),
                report.getIsClosed(),
                report.getReportedBy().getUsername());
    }
}
