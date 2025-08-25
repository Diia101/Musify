package com.licenta.musify.exceptions;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleEntityNotFound(EntityNotFoundException entityNotFoundException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.NOT_FOUND, entityNotFoundException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SongNotFoundException.class)
    public ResponseEntity<?> handleSongNotFound(SongNotFoundException songNotFoundException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.NOT_FOUND, songNotFoundException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ArtistNotFoundException.class)
    public ResponseEntity<?> handleArtistNotFound(ArtistNotFoundException artistNotFoundException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.NOT_FOUND, artistNotFoundException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(UserUnauthorizedLoginException.class)
    public ResponseEntity<?> handleUserUnauthorizedLogin(UserUnauthorizedLoginException userUnauthorizedLoginException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.UNAUTHORIZED, userUnauthorizedLoginException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound(UserNotFoundException userNotFoundException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.NOT_FOUND, userNotFoundException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserPasswordNotMatchingException.class)
    public ResponseEntity<?> handleUserPasswordNotMatching(UserPasswordNotMatchingException userPasswordNotMatchingException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.BAD_REQUEST, userPasswordNotMatchingException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserIdenticalNewPasswordException.class)
    public ResponseEntity<?> handleIdenticalNewPassword(UserIdenticalNewPasswordException identicalNewPasswordException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.BAD_REQUEST, identicalNewPasswordException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ArtistIncorrectUserNumberException.class)
    public ResponseEntity<?> handleIncorrectUserNumber(ArtistIncorrectUserNumberException incorrectUserNumberException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.BAD_REQUEST, incorrectUserNumberException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FieldValidationFailedException.class)
    public ResponseEntity<?> handleFieldValidationFailed(FieldValidationFailedException fieldValidationFailedException) {
        RestExceptionDetailsMessagesList exceptionDetails = RestExceptionDetailsMessagesList.of(HttpStatus.BAD_REQUEST, fieldValidationFailedException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AlbumNotFoundException.class)
    public ResponseEntity<?> handleAlbumNotFound(AlbumNotFoundException albumNotFoundException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.NOT_FOUND, albumNotFoundException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PlaylistCannotBeFollowedException.class)
    public ResponseEntity<?> handlePlaylistCannotBeFollowed(PlaylistCannotBeFollowedException playlistCannotBeFollowedException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.BAD_REQUEST, playlistCannotBeFollowedException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PlaylistCannotBeUnfollowedException.class)
    public ResponseEntity<?> handlePlaylistCannotBeUnfollowed(PlaylistCannotBeUnfollowedException playlistCannotBeUnfollowedException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.BAD_REQUEST, playlistCannotBeUnfollowedException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidChangeOrderParameters.class)
    public ResponseEntity<?> handleInvalidChangeOrderParameters(InvalidChangeOrderParameters invalidChangeOrderParameters) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.BAD_REQUEST, invalidChangeOrderParameters);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PlaylistNotFoundException.class)
    public ResponseEntity<?> handlePlaylistNotFoundException(PlaylistNotFoundException playlistNotFoundException) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.BAD_REQUEST, playlistNotFoundException);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserAlreadyExists.class)
    public ResponseEntity<?> handleUserAlreadyExistsException(UserAlreadyExists userAlreadyExists) {
        RestExceptionDetails exceptionDetails = RestExceptionDetails.of(HttpStatus.BAD_REQUEST, userAlreadyExists);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }
}
