package com.ihu.imdbback.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLikesMovieDTO {

  private Integer movieId;
  private String userEmail;

}
