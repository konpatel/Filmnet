package com.ihu.imdbback.config.exception;

import com.ihu.imdbback.dto.exceptionDTO.ErrorDTO;
import com.ihu.imdbback.dto.exceptionDTO.FilmNetErrorDTO;
import com.ihu.imdbback.dto.exceptionDTO.ValidationDTO;
import com.ihu.imdbback.exception.FilmNetException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@ControllerAdvice
public class FilmNetExceptionMapper extends ResponseEntityExceptionHandler {

  @ExceptionHandler(value = {FilmNetException.class, BadCredentialsException.class, Exception.class})
  protected ResponseEntity<FilmNetErrorDTO> handleScrutinyException(Exception ex) {
    FilmNetErrorDTO filmNetErrorDTO;
    if (ex.getClass().isAssignableFrom(BadCredentialsException.class)) {
      filmNetErrorDTO = new FilmNetErrorDTO(ex.getMessage());
      return ResponseEntity
        .status(500)
        .body(filmNetErrorDTO);
    } else if (ex.getClass().isAssignableFrom(SecurityException.class)) {
      filmNetErrorDTO = new FilmNetErrorDTO(ex.getMessage());
      return ResponseEntity
        .status(500)
        .body(filmNetErrorDTO);
    } else {
      FilmNetException error = FilmNetException.wrap(ex);
      log.error("Filmnet error : ", error);
      filmNetErrorDTO = new FilmNetErrorDTO(error.getMessage());
      return ResponseEntity
        .status(500)
        .body(filmNetErrorDTO);
    }
  }


  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
    log.error(ex.getMessage());
    List<ValidationDTO> validationDTOs = new ArrayList<ValidationDTO>();
    ex.getAllErrors().forEach(e -> {
      ValidationDTO validationDTO = new ValidationDTO();
      validationDTO.setErrorValidation(e.getDefaultMessage());
      validationDTOs.add(validationDTO);
    });
    HttpHeaders responseHeaders = new HttpHeaders();
    responseHeaders.add("X-VALIDATION-ERROR", "true");
    ErrorDTO errorDTO = new ErrorDTO(validationDTOs);

    return ResponseEntity
      .badRequest()
      .headers(responseHeaders)
      .body(errorDTO);
  }

}
