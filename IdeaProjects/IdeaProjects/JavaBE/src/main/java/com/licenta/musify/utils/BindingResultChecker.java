package com.licenta.musify.utils;

import com.licenta.musify.exceptions.FieldValidationFailedException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;

import java.util.List;

public class BindingResultChecker {
    public static void checkErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            throw new FieldValidationFailedException(errorMessages);
        }
    }
}
