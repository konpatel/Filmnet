package com.ihu.imdbback.dto.exceptionDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilmNetErrorDTO {

  private String message;

  public FilmNetErrorDTO(String code) {
    this.message = code;
  }

}
