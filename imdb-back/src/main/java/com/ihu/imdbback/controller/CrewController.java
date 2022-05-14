package com.ihu.imdbback.controller;

import com.ihu.imdbback.dto.CrewDTO;
import com.ihu.imdbback.dto.MovieDTO;
import com.ihu.imdbback.service.CrewService;
import com.ihu.imdbback.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CrewController {

  private final CrewService crewService;
  private final MovieService movieService;

  @GetMapping("/crew/get/popular-people")
  public Page<CrewDTO> getCrewPeople(Pageable pageable, @RequestParam(required = false) String filterValue) {
    return crewService.getCrewPeople(pageable, filterValue);
  }

  @GetMapping("/lock/crew/get/{id}")
  public CrewDTO getCrewById(@PathVariable Integer id) {
    return crewService.getCrewById(id);
  }

  @GetMapping("/lock/crew/get/movies")
  public Page<MovieDTO> getCrewMovies(Pageable pageable, @RequestParam(required = true) String filterValue) {
    return movieService.getMoviesByCrew(pageable, filterValue);
  }

}
