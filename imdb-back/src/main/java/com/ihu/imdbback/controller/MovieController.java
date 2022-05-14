package com.ihu.imdbback.controller;

import com.ihu.imdbback.dto.MovieDTO;
import com.ihu.imdbback.dto.YearCounter;
import com.ihu.imdbback.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MovieController {

  private final MovieService movieService;

  @GetMapping("/movies/get/popular")
  public Page<MovieDTO> getPopularMovies(Pageable pageable) {
    return movieService.getPopularMovies(pageable);
  }

  @GetMapping("/movies/get/latest")
  public Page<MovieDTO> getLatestMovie(Pageable pageable) {
    return movieService.getLatestMovie(pageable);
  }

  @GetMapping("/movies/get/up-coming")
  public List<MovieDTO> getUpComingMovies() {
    return movieService.getUpComingMovies();
  }

  @GetMapping("/movies/get/top-rated")
  public Page<MovieDTO> getTopRatedMovies(Pageable pageable) {
    return movieService.getTopRatedMovies(pageable);
  }

  @RequestMapping("/movies/get/genre")
  @GetMapping
  public Page<MovieDTO> getMoviesByGenre(Pageable pageable,@RequestParam(required = false) String filterValue) {
    return movieService.getMoviesByGenre(pageable, filterValue);
  }

  @RequestMapping("/lock/movies/get/{id}")
  @GetMapping
  public MovieDTO getMovieById(@PathVariable Integer id) {
    return movieService.getMovieById(id);
  }

  @GetMapping("/movies/get/searched/results")
  public Page<MovieDTO> getMoviesBySearch(Pageable pageable, @RequestParam(required = true) String filterValue) {
    return movieService.getMoviesBySearch(pageable, filterValue);
  }

  @GetMapping("/get/top/voted/movies")
  public List<MovieDTO> getTopMoviesByVoteAverage() {
    return this.movieService.getTopMoviesByVoteAverage();
  }

}
