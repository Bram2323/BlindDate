package com.brajula.blinddate.security;

public enum Role {
    USER("USER"),
    ADMIN("ADMIN"),
    MODERATOR("MODERATOR");

    public final String label;

    private Role(String label) {
        this.label = label;
    }
}
