package com.licenta.musify.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class RestExceptionDetailsMessagesList {
    private HttpStatus status;
    private int code;
    private List<String> messages;
    private final LocalDateTime timestamp = LocalDateTime.now();

    private RestExceptionDetailsMessagesList(HttpStatus status, int code, List<String> messages) {
        this.status = status;
        this.code = code;
        this.messages = messages;
    }

    public static RestExceptionDetailsMessagesList of(HttpStatus status, FieldValidationFailedException fieldValidationFailedException) {
        return new RestExceptionDetailsMessagesList(status, status.value(), fieldValidationFailedException.getErrorMessages());
    }
}
