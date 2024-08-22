package com.brajula.blinddate.entities.report;

import com.brajula.blinddate.entities.profile.Profile;
import com.brajula.blinddate.entities.profile.ProfileRepository;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final ProfileRepository profileRepository;

    public GetReportDto save(PostReportDto report, User user) {
        Profile reportedProfile =
                profileRepository.findById(report.profileId()).orElseThrow(NotFoundException::new);
        Report savedReport = new Report(report.reportMessage(), reportedProfile, user);
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
