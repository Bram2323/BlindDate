package com.brajula.blinddate.security;

public record AuthRegisterDTO(
        String username, String password, String firstName, String lastName, String email) {}
