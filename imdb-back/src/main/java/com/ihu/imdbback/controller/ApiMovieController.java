package com.ihu.imdbback.controller;

import com.ihu.imdbback.service.ApiMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ApiMovieController {

  private final ApiMovieService apiMovieService;

//  @PostConstruct
  public void getMoviesForUsage() throws Exception {
    this.apiMovieService.getMoviesFromApi();
  }

//      @PostConstruct
  public void getCrewByIdFromApi() throws Exception {
    this.apiMovieService.getCreByFromApi();
  }

}
