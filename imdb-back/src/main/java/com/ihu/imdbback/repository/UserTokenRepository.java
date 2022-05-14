package com.ihu.imdbback.repository;

import com.ihu.imdbback.entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTokenRepository extends JpaRepository<UserToken, String> {

  UserToken findByAuthUser_Username(String email);

  UserToken findByToken(String token);
}
