package com.licenta.musify.domain.dao;

import com.licenta.musify.domain.dto.UserChangePasswordDto;
import com.licenta.musify.domain.dto.UserCreateDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.dto.UserUpdateDto;
import com.licenta.musify.domain.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserDao {

    void create(UserCreateDto userCreateDto);

    User findByEmail(String email);

    UserUpdateDto update(Integer id, UserUpdateDto userUpdateDto);

    void softDelete(Integer id);

    void updatePassword(int id, UserChangePasswordDto userChangePasswordDto);

    UserDetails loadByUsername(String email);

    Optional<User> findById(Integer id);

    UserDto findUserById(Integer id);

    void updateResetPasswordToken(String resetPasswordToken, String email);

    User getByResetPasswordToken(String resetPasswordToken);

    void updatePassword(User user, String newPassword);
}
