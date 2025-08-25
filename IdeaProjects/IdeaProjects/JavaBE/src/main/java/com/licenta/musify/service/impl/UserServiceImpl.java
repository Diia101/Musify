package com.licenta.musify.service.impl;

import com.licenta.musify.auth.TokenProvider;
import com.licenta.musify.constant.Roles;
import com.licenta.musify.domain.dao.ArtistDao;
import com.licenta.musify.domain.dao.UserDao;
import com.licenta.musify.domain.dto.*;
import com.licenta.musify.domain.model.User;
import com.licenta.musify.exceptions.ArtistNotFoundException;
import com.licenta.musify.exceptions.UserNotFoundException;
import com.licenta.musify.exceptions.UserPasswordNotMatchingException;
import com.licenta.musify.service.UserService;
import com.licenta.musify.utils.SecurityUtil;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    private final AuthenticationManager authenticationManager;

    private final TokenProvider tokenProvider;

    private final JavaMailSender mailSender;

    private final ArtistDao artistDao;

    @Override
    public void create(UserCreateDto userCreateDto) {
        userDao.create(userCreateDto);
    }

    @Override
    public LoginViewDto login(UserLoginDto userLoginDto) {
        User u = userDao.findByEmail(userLoginDto.getEmail());
        if (u != null && !u.getIsActive())
            throw new UserNotFoundException("Email or password is invalid!");

        ArtistDto artistDto = new ArtistDto();

        try {
            artistDto = artistDao.getByUserId(u.getUserId());
        } catch (ArtistNotFoundException exception) {
            artistDto = null;
        }

        var usernamePassword = new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getUserPassword());

        try {
            var authUser = authenticationManager.authenticate(usernamePassword);
            var accessToken = tokenProvider.generateAccessToken((User) authUser.getPrincipal());
            return new LoginViewDto(u.getUserId(), Roles.ADMIN.equals(u.getUserType()), artistDto, accessToken);
        } catch (AuthenticationException authenticationException) {
            throw new UserPasswordNotMatchingException("Bad credentials!");
        }
    }

    @Override
    public UserValidationDto validate(String email) {
        Optional<User> userWithSameEmail = Optional.ofNullable(userDao.findByEmail(email));

        if (userWithSameEmail.isPresent()) {
            return new UserValidationDto(302, true);
        } else {
            return new UserValidationDto(404, false);
        }
    }

    @Override
    public UserUpdateDto update(Integer id, UserUpdateDto userUpdateDto) {
        return userDao.update(id, userUpdateDto);
    }

    @Override
    public void delete() {
        userDao.softDelete(SecurityUtil.getAuthenticatedUserId());
    }

    @Override
    public void updatePassword(int id, UserChangePasswordDto userChangePasswordDto) {
        userDao.updatePassword(id, userChangePasswordDto);
    }

    @Override
    public UserDto findById(Integer id) {
        return userDao.findUserById(id);
    }

    @Override
    public Boolean validateToken(String jwt) {
        try {
            tokenProvider.validateToken(jwt);
            return true;
        } catch(JWTVerificationException exception) {
            return false;
        }
    }

    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("munteandiana101@gmail.com", "Musify");
        helper.setTo(recipientEmail);

        String subject = "Reset Password Musify!";

        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>";

        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }

    @Override
    public void processForgotPassword(String email) throws MessagingException, UnsupportedEncodingException {
        if (!email.toLowerCase().endsWith("@gmail.com")) {
            throw new IllegalArgumentException("Sunt permise doar adrese Gmail.");
        }

        String token = RandomString.make(30);

        userDao.updateResetPasswordToken(token, email);
        String resetPasswordLink = "http://localhost:5173/resetPassword/" + token;
        sendEmail(email, resetPasswordLink);
    }

    @Override
    public void processResetPassword(String token, String password) {
        User user = userDao.getByResetPasswordToken(token);
        userDao.updatePassword(user, password);
    }
}
