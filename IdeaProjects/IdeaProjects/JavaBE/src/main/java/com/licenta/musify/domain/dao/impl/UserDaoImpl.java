package com.licenta.musify.domain.dao.impl;

import com.licenta.musify.constant.Roles;
import com.licenta.musify.domain.dao.UserDao;
import com.licenta.musify.domain.dto.UserChangePasswordDto;
import com.licenta.musify.domain.dto.UserCreateDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.dto.UserUpdateDto;
import com.licenta.musify.domain.mapper.UserMapper;
import com.licenta.musify.domain.model.User;
import com.licenta.musify.exceptions.UserAlreadyExists;
import com.licenta.musify.exceptions.UserIdenticalNewPasswordException;
import com.licenta.musify.exceptions.UserNotFoundException;
import com.licenta.musify.exceptions.UserPasswordNotMatchingException;
import com.licenta.musify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserDaoImpl implements UserDao {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    @Override
    @Transactional
    public void create(UserCreateDto userCreateDto) {
        if (userRepository.findByEmail(userCreateDto.getEmail()) != null)
            throw new UserAlreadyExists("Email already used!");

        User user = userMapper.toEntity(userCreateDto);

        user.setUserType(Roles.REGULAR);

        user.setUserPassword(new BCryptPasswordEncoder().encode(user.getUserPassword()));

        user.setIsActive(true);

        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public UserUpdateDto update(Integer id, UserUpdateDto userUpdateDto) {
        User user = userRepository.getReferenceById(id);
        user.setFirstname(userUpdateDto.getFirstname());
        user.setLastname(userUpdateDto.getLastname());
        user.setCountry(userUpdateDto.getCountry());
        return userMapper.toUpdateViewDto(user);
    }

    @Override
    @Transactional
    public void softDelete(Integer id) {
        User user = userRepository.getReferenceById(id);
        user.setIsActive(false);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updatePassword(int id, UserChangePasswordDto userChangePasswordDto) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Provided id doesn't exist"));

        if (!new BCryptPasswordEncoder().matches(userChangePasswordDto.getOldPassword(), user.getUserPassword())) {
            throw new UserPasswordNotMatchingException("Provided old password doesn't match");
        }

        if (!userChangePasswordDto.getOldPassword().equals(userChangePasswordDto.getReEnteredOldPassword())) {
            throw new UserPasswordNotMatchingException("Reentered password doesn't match");
        }

        if (userChangePasswordDto.getReEnteredOldPassword().equals(userChangePasswordDto.getNewPassword())) {
            throw new UserIdenticalNewPasswordException("Provided new password mustn't be identical to the old one");
        }

        user.setUserPassword(new BCryptPasswordEncoder().encode(userChangePasswordDto.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadByUsername(String email) {
        return userRepository.findUserDetailsByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public UserDto findUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Provided id doesn't exist"));
        return userMapper.toUserDto(user);
    }

    @Override
    public void updateResetPasswordToken(String resetPasswordToken, String email) throws UserNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setResetPasswordToken(resetPasswordToken);
            userRepository.save(user);
        } else {
            throw new UserNotFoundException("User with email address " + email + " not found!");
        }
    }

    @Override
    public User getByResetPasswordToken(String resetPasswordToken) {
        return userRepository.findByResetPasswordToken(resetPasswordToken);
    }

    @Override
    public void updatePassword(User user, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setUserPassword(encodedPassword);
        user.setResetPasswordToken(null);
        userRepository.save(user);
    }
}
