package com.licenta.musify.exceptions;

import java.time.LocalDateTime;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RestExceptionDetails {

    private HttpStatus status;
    private int code;
    private String message;
    private final LocalDateTime timestamp = LocalDateTime.now();

    private RestExceptionDetails(HttpStatus status, int code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public static RestExceptionDetails of(HttpStatus status, Exception e) {
        return new RestExceptionDetails(status, status.value(), e.getMessage());
    }
}
