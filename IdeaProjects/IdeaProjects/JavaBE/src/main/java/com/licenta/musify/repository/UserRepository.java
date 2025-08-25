package com.licenta.musify.repository;

import com.licenta.musify.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT user_id FROM users WHERE email = ?1 and user_password = ?2", nativeQuery = true)
    Optional<Integer> getUserIdByEmailAndPassword(String email, String password);

    User findByEmail(String email);

    UserDetails findUserDetailsByEmail(String email);

    @Override
    @Query(value = "select * from users where is_active = true and user_id = ?1", nativeQuery = true)
    Optional<User> findById(Integer id);

    User findByResetPasswordToken(String resetPasswordToken);
}
