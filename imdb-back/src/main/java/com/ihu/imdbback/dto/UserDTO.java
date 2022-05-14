package com.ihu.imdbback.dto;

import com.ihu.imdbback.config.annotation.ValidPassword;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UserDTO {

  private String id;

  @NotBlank(message = "Firstname must not be empty")
  private String firstname;

  @NotBlank(message = "Lastname must not be empty")
  private String lastname;

  @NotBlank(message = "Username must not be empty")
  private String username;

  @NotBlank(message = "Email must not be empty")
  @Email(message = "Email is not valid")
  private String email;

  @ValidPassword
  private String password;

  @NotBlank(message = "Confirm password must not be empty")
  private String confirmPassword;

  private Set<MovieDTO> likedMovies;

  private List<ReviewDTO> reviews;

}
