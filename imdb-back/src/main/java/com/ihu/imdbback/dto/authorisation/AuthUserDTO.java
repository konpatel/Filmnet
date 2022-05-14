package com.ihu.imdbback.dto.authorisation;

import com.ihu.imdbback.entity.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class AuthUserDTO {

  private String id;

  private String username;

  private String password;

  private boolean active;

  private Set<Role> roles;

}
