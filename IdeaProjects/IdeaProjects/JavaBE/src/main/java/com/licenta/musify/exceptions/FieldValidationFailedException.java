package com.licenta.musify.exceptions;

import java.util.List;

public class FieldValidationFailedException extends RuntimeException {
    private List<String> errorMessages;

    public FieldValidationFailedException(List<String> errorMessages) {
        this.errorMessages = errorMessages;
    }

    public List<String> getErrorMessages() {
        return errorMessages;
    }

    public String getMessages() {
        return String.join("\n", errorMessages);
    }
}
