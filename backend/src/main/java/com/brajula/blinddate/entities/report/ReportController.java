package com.brajula.blinddate.entities.report;

import static com.brajula.blinddate.Routes.REPORTS;

import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(REPORTS)
public class ReportController {
    private final ReportService reportService;

    // create a report
    @PostMapping
    public ResponseEntity<GetReportDto> create(
            @RequestBody PostReportDto dto, Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();
        if (user == null) {
            throw new ForbiddenException();
        }
        GetReportDto savedReport = reportService.save(dto, user);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(savedReport.reportedProfileId())
                        .toUri();
        return ResponseEntity.created(location).body(savedReport);
    }

    // moderator should be able to see reports
    @GetMapping
    public List<GetReportDto> getAll(Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();
        if (user == null) {
            throw new ForbiddenException();
        } else if (!user.hasRole(Role.MODERATOR) && !user.hasRole(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        return reportService.getAll();
    }

    // moderator should be able to see individual report
    @GetMapping("/{id}")
    public GetReportDto getAll(@PathVariable Long id, Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();
        if (user == null) {
            throw new ForbiddenException();
        } else if (!user.hasRole(Role.MODERATOR) && !user.hasRole(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        return reportService.getById(id);
    }

    // moderator should be able to close a report, and/or add details to report
    @PatchMapping("/{id}")
    public ResponseEntity<GetReportDto> update(
            @PathVariable Long id, @RequestBody GetReportDto patch) {
        return ResponseEntity.ok().body(reportService.patch(patch, id));
    }
}
