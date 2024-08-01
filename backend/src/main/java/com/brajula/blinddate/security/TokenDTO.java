package com.brajula.blinddate.security;

import com.brajula.blinddate.entities.user.UserFullDTO;

public record TokenDTO(String token, UserFullDTO user) {}
