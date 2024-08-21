package com.brajula.blinddate.entities.report;

import com.brajula.blinddate.entities.profile.Profile;
import com.brajula.blinddate.entities.user.User;

import jakarta.persistence.*;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
@Getter
@Entity
public class Report {
    @GeneratedValue @Id private Long id;

    private String reportMessage;
    @Setter private String moderatorDetails;

    @ManyToOne private Profile reportedProfile;

    @ManyToOne private User reportedBy;

    private LocalDate reportedOn;

    private Boolean isClosed;

    public Report(String reportMessage, Profile reportedProfile, User reportedBy) {
        this.reportMessage = reportMessage;
        this.reportedProfile = reportedProfile;
        this.reportedOn = LocalDate.now();
        this.isClosed = false;
        this.reportedBy = reportedBy;
    }
}
