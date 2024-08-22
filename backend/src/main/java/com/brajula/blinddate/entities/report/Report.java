package com.brajula.blinddate.entities.report;

import com.brajula.blinddate.entities.user.User;

import jakarta.persistence.*;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
@Getter
@Entity
public class Report {
    @GeneratedValue @Id private Long id;

    private String reportMessage;
    @Setter private List<String> moderatorDetails = new ArrayList<>();

    @ManyToOne private User reportedUser;

    @ManyToOne private User reportedBy;

    private LocalDate reportedOn;

    private Boolean isClosed;

    public void addModeratorDetail(List<String> messages) {
        moderatorDetails.addAll(messages);
    }

    public Report(String reportMessage, User reportedUser, User reportedBy) {
        this.reportMessage = reportMessage;
        this.reportedUser = reportedUser;
        this.reportedOn = LocalDate.now();
        this.isClosed = false;
        this.reportedBy = reportedBy;
    }
}
