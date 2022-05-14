package com.ihu.imdbback.repository;

import com.ihu.imdbback.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

  boolean existsByEmail(String email);
  boolean existsByUsername(String username);
  User findByEmail(String email);
  User findByUsername(String username);
  void deleteByEmail(String email);
}
