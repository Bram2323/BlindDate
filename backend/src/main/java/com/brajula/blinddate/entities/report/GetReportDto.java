package com.brajula.blinddate.entities.report;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

// reported by = username

public record GetReportDto(
        Long id,
        String reportMessage,
        String reportedUsername,
        UUID reportedUserId,
        List<String> moderatorDetails,
        LocalDate reportedOn,
        Boolean isClosed,
        String reportedBy) {

    public static GetReportDto from(Report report) {
        return new GetReportDto(
                report.getId(),
                report.getReportMessage(),
                report.getReportedUser().getUsername(),
                report.getReportedUser().getId(),
                report.getModeratorDetails(),
                report.getReportedOn(),
                report.getIsClosed(),
                report.getReportedBy().getUsername());
    }
}
