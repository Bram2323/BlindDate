package com.brajula.blinddate.entities.user;

import com.brajula.blinddate.entities.profile.Profile;
import com.brajula.blinddate.security.Role;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity(name = "Users")
@NoArgsConstructor
@Getter
public class User implements UserDetails {

    public static final String ROLE_PREFIX = "ROLE_";

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Setter private String username;

    @Setter private String password;

    private String role;

    @Setter private String firstName;

    @Setter private String lastName;

    @Setter private String email;

    public User(
            String username,
            String password,
            Role role,
            String firstName,
            String lastName,
            String email) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;

        setRole(role);
    }

    public boolean hasRole(Role role) {
        return this.role.equals(ROLE_PREFIX + role.label);
    }

    public void setRole(Role role) {
        this.role = ROLE_PREFIX + role.label;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof User otherUser)) return false;
        return id.equals(otherUser.id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
