package com.ihu.imdbback.dto.authorisation;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserDetailsDTO {

  private String username;
  private Set<String> roles;

}
