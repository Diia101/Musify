package com.licenta.musify.exceptions;

public class AlbumNotFoundException extends RuntimeException{
    public AlbumNotFoundException(String message) {
        super(message);
    }

}
