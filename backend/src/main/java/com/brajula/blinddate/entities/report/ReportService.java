package com.brajula.blinddate.entities.report;

import com.brajula.blinddate.entities.profile.Profile;
import com.brajula.blinddate.entities.profile.ProfileRepository;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final ProfileRepository profileRepository;

    public Report save(PostReportDto report, User user) {
        Profile reportedProfile =
                profileRepository.findById(report.profileId()).orElseThrow(NotFoundException::new);
        Report savedReport = new Report(report.reportMessage(), reportedProfile, user);
        return reportRepository.save(savedReport);
    }
    /*
       public Report patch() {
           return null; // patched report
       }

    */
}
