package com.licenta.musify.exceptions;

public class UserUnauthorizedLoginException extends RuntimeException {
    public UserUnauthorizedLoginException(String message) {
        super(message);
    }
}
