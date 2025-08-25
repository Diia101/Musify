package com.licenta.musify.exceptions;

public class UserPasswordNotMatchingException extends RuntimeException {
    public UserPasswordNotMatchingException(String message) {
        super(message);
    }
}
