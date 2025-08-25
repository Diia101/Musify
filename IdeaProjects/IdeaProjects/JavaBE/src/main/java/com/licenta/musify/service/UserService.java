package com.licenta.musify.service;

import com.licenta.musify.domain.dto.*;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface UserService {

    void create(UserCreateDto userCreateDto);

    LoginViewDto login(UserLoginDto userLoginDto);

    UserValidationDto validate(String email);

    UserUpdateDto update(Integer id, UserUpdateDto userUpdateDto);

    void delete();

    void updatePassword(int id, UserChangePasswordDto userChangePasswordDto);

    UserDto findById(Integer id);

    Boolean validateToken(String jwt);

    void processForgotPassword(String email) throws MessagingException, UnsupportedEncodingException;

    void processResetPassword(String token, String password);
}
