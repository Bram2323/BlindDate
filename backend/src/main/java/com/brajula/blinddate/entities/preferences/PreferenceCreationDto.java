package com.brajula.blinddate.entities.preferences;

import com.brajula.blinddate.exceptions.BadRequestException;

public record PreferenceCreationDto(String name) {
    public Preference toPreference() {
        if (this.name == null) {
            throw new BadRequestException("Preference has no value");
        }
        return new Preference(this.name);
    }
}
