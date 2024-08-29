package com.brajula.blinddate.entities.profile;

import java.util.UUID;

public record MatchDto(UUID matchId, String matchUsername, Boolean hasOpenChat) {
    public static MatchDto from(Profile profile, Boolean hasOpenChat) {
        return new MatchDto(
                profile.getUser().getId(), profile.getUser().getUsername(), hasOpenChat);
    }
}
