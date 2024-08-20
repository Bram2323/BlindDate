package com.brajula.blinddate.entities.report;

import static com.brajula.blinddate.Routes.REPORTS;

import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.ForbiddenException;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(REPORTS)
public class ReportController {
    private final ReportService reportService;

    // create a report
    @PostMapping
    public Report create(@RequestBody PostReportDto report, Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();
        if (user == null) {
            throw new ForbiddenException();
        }
        return reportService.save(report, user);
    }

    /*
    // patch a report
    @PatchMapping("/{id}")
    public Report update() {
        return reportService.patch();
    }

     */
}
