package com.ihu.imdbback.repository.authorisation;

import com.ihu.imdbback.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {

  Role findByName(String name);
}
