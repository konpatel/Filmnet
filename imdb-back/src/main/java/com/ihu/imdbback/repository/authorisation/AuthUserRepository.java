package com.ihu.imdbback.repository.authorisation;

import com.ihu.imdbback.entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthUserRepository extends JpaRepository<AuthUser, String> {

  AuthUser findByUsername(String username);
  List<AuthUser> findAllByActiveFalse();

}
