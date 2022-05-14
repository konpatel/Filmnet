package com.ihu.imdbback.dto.exceptionDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidationDTO {

  private String errorValidation;

  public ValidationDTO(String errorValidation) {
    this.errorValidation = errorValidation;
  }

  public ValidationDTO() {
    super();
  }
}
