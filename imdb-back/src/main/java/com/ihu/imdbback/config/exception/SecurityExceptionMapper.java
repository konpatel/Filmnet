package com.ihu.imdbback.config.exception;

import com.ihu.imdbback.dto.exceptionDTO.FilmNetErrorDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class SecurityExceptionMapper extends ResponseEntityExceptionHandler {

  @ExceptionHandler(value = {SecurityException.class})
  protected ResponseEntity<FilmNetErrorDTO> handleSecurityException(Exception ex) {
    SecurityException error = SecurityException.wrap(ex);
    log.error("Security error: ", error);

    FilmNetErrorDTO errorDTO = new FilmNetErrorDTO(error.getMessage());
    return ResponseEntity
      .status(403)
      .body(errorDTO);
  }

}
