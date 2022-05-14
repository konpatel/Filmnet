package com.ihu.imdbback.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserLoginDTO {
  @NotBlank(message = "Email must not be empty")
  private String email;

  @NotBlank(message = "Password must not be empty")
  private String password;
}
