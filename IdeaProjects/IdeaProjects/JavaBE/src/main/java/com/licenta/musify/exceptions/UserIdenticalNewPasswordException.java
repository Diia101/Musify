package com.licenta.musify.exceptions;

public class UserIdenticalNewPasswordException extends RuntimeException {
    public UserIdenticalNewPasswordException(String message) {
        super(message);
    }
}
