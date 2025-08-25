package com.licenta.musify.controller;

import com.licenta.musify.domain.dto.*;
import com.licenta.musify.service.UserService;
import com.licenta.musify.utils.BindingResultChecker;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@CrossOrigin
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@Valid @RequestBody UserCreateDto userCreateDto, BindingResult bindingResult) {
        BindingResultChecker.checkErrors(bindingResult);
        userService.create(userCreateDto);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginViewDto loginUser(@Valid @RequestBody UserLoginDto userLoginDto, BindingResult bindingResult) {
        BindingResultChecker.checkErrors(bindingResult);
        return userService.login(userLoginDto);
    }

    @GetMapping("/validate")
    public UserValidationDto validateAttempt(@RequestParam String email) {
        return userService.validate(email);
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public UserUpdateDto updateUser(@PathVariable Integer id, @RequestBody UserUpdateDto userUpdateDto) {
        return userService.update(id, userUpdateDto);
    }

    @DeleteMapping
    @SecurityRequirement(name = "bearerAuth")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser() {
        userService.delete();
    }


    @PutMapping("/{id}/change-password")
    @SecurityRequirement(name = "bearerAuth")
    public void changePassword(@PathVariable int id, @Valid @RequestBody UserChangePasswordDto userChangePasswordDto, BindingResult bindingResult) {
        BindingResultChecker.checkErrors(bindingResult);
        userService.updatePassword(id, userChangePasswordDto);
    }

    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public UserDto findById(@PathVariable Integer id) {
        return userService.findById(id);
    }

    @GetMapping("/validateToken")
    public JwtValidationViewDto validateToken(@RequestParam String jwt) {
        return new JwtValidationViewDto(userService.validateToken(jwt));
    }

    @PostMapping("/forgotPassword")
    public void processForgotPassword(@RequestParam String email) throws MessagingException, UnsupportedEncodingException {
        userService.processForgotPassword(email);
    }

    @PostMapping("/resetPassword")
    public void processResetPassword(@RequestParam String token, @RequestParam String password) {
        userService.processResetPassword(token, password);
    }
}
