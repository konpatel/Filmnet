package com.ihu.imdbback.dto.exceptionDTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ErrorDTO {

  private List<ValidationDTO> validationDTOs;

  public ErrorDTO(List<ValidationDTO> validationDTOs) {
    this.validationDTOs = validationDTOs;
  }

}
