package com.ihu.imdbback.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserEmailDTO {

  @NotBlank(message = "Email must not be empty")
  @Email(message = "Email is not valid")
  private String email;

}
