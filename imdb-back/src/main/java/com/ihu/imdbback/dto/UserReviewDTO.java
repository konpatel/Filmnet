package com.ihu.imdbback.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserReviewDTO {

  private String id;
  private String email;
  @NotBlank(message = "Review must not be empty")
  private String review;
  @NotNull(message = "You must rate this movie")
  private Integer rating;
  private Integer movieId;

}
