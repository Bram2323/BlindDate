package com.brajula.blinddate.entities.report;

import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserService;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserService userService;

    public GetReportDto save(PostReportDto report, User user) {
        User reportedUser =
                userService
                        .loadUserByUsername(report.reportedUsername());
        Report savedReport = new Report(report.reportMessage(), reportedUser, user);
        reportRepository.save(savedReport);
        return GetReportDto.from(savedReport);
    }

    public List<GetReportDto> getAll() {
        return reportRepository.findAll().stream().map(GetReportDto::from).toList();
    }

    public GetReportDto getById(Long id) {
        Report report = reportRepository.findById(id).orElseThrow(ForbiddenException::new);
        return GetReportDto.from(report);
    }

    public GetReportDto patch(GetReportDto patch, Long id) {
        Report report = reportRepository.findById(id).orElseThrow(NotFoundException::new);
        if (patch.isClosed() != null) {
            report.setIsClosed(patch.isClosed());
        }
        if (patch.moderatorDetails() != null) {
            report.addModeratorDetail(patch.moderatorDetails());
        }
        return GetReportDto.from(reportRepository.save(report));
    }
}
