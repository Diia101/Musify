package com.licenta.musify.auth;

import com.licenta.musify.domain.dao.UserDao;
import com.licenta.musify.domain.model.User;
import com.licenta.musify.exceptions.UserNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@AllArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final UserDao userDao;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        var token = recoverToken(request);

        if (token != null) {
            String userIdStr = tokenProvider.validateToken(token);
            Integer userId = Integer.valueOf(userIdStr);

            Optional<User> userOpt = userDao.findById(userId);
            if (userOpt.isPresent()) {
                User userEntity = userOpt.get();

                if (userEntity.getUserType() == null) {
                    throw new IllegalStateException("UserType is null for user ID: " + userEntity.getUserId());
                }

                var authentication = new UsernamePasswordAuthenticationToken(
                        userEntity,
                        null,
                        userEntity.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                throw new UserNotFoundException("User not found based on JWT token");
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        return authHeader.replace("Bearer ", "");
    }
}
