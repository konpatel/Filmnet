package com.ihu.imdbback.dto;

import com.ihu.imdbback.config.annotation.ValidPassword;
import com.ihu.imdbback.dto.authorisation.AuthUserDTO;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserTokenDTO {

  private String id;
  private String token;

  @ValidPassword
  private String password;

  @NotBlank(message = "Confirm password must not be empty")
  private String confirmPassword;

  private AuthUserDTO authUserDTO;

}
