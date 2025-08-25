package com.licenta.musify.constant;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@Getter
public enum Roles implements GrantedAuthority {
    REGULAR,
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
