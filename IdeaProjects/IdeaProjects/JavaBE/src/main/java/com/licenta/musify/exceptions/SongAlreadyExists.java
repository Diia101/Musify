package com.licenta.musify.exceptions;

public class SongAlreadyExists extends RuntimeException {
    public SongAlreadyExists(String message) {
        super(message);
    }
}