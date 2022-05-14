package com.ihu.imdbback.service;

import com.ihu.imdbback.dto.MovieDTO;
import com.ihu.imdbback.dto.YearCounter;
import com.ihu.imdbback.entity.Movie;
import com.ihu.imdbback.mapper.MovieMapper;
import com.ihu.imdbback.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovieService {

  private final MovieRepository movieRepository;
  private final MovieMapper movieMapper;


  public Page<MovieDTO> getPopularMovies(Pageable pageable) {
    Pageable paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
    Page<Movie> pagedResult;
    pagedResult = movieRepository.findAllByOrderByPopularityDesc(paging);
    return pagedResult.map(movieMapper::map);
  }

  public Page<MovieDTO> getLatestMovie(Pageable pageable) {
    Pageable paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
    Page<Movie> pagedResult;
    pagedResult = movieRepository.findAllByUpComingIsOrderByReleaseDateDesc(false, paging);
    return pagedResult.map(movieMapper::map);
  }

  public List<MovieDTO> getUpComingMovies() {
    List<Movie> movieList = new ArrayList<>();
    movieList = movieRepository.findAllByUpComingTrue();
    return movieMapper.mapToDtos(movieList);
  }

  public Page<MovieDTO> getTopRatedMovies(Pageable pageable) {
    Pageable paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
    Page<Movie> pagedResult;
    pagedResult = movieRepository.findAllByOrderByVoteAverageDesc(paging);
    return pagedResult.map(movieMapper::map);
  }

  public Page<MovieDTO> getMoviesByGenre(Pageable pageable, String filterValue) {
    Pageable paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
    Page<Movie> pagedResult;
    pagedResult = movieRepository.findAllByGenresId(paging, Integer.parseInt(filterValue));
    return pagedResult.map(movieMapper::map);
  }

  public MovieDTO getMovieById(Integer id) {
    Optional<Movie> movie = movieRepository.findById(id);
    return movieMapper.map(movie.get());
  }

  public Page<MovieDTO> getMoviesBySearch(Pageable pageable, String filterValue) {
    Pageable paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
    Page<Movie> pagedResult;
    pagedResult = movieRepository.findAllWithPartOfTitle(paging, filterValue);
    return pagedResult.map(movieMapper::map);
  }

  public Page<MovieDTO> getMoviesByCrew(Pageable pageable, String id) {
    Pageable paging = PageRequest.of(0, 30);
    Page<Movie> pagedResult;
    pagedResult = movieRepository.findAllByCrewSetId(paging, Integer.parseInt(id));
    return pagedResult.map(movieMapper::map);
  }

  public List<MovieDTO> getTopMoviesByVoteAverage() {
    List<Movie> movies = new ArrayList<Movie>();
    Pageable paging = PageRequest.of(0, 12);
    Page<Movie> pagedResult;
    pagedResult = movieRepository.findTop10(paging);
    movies = pagedResult.getContent();
    return this.movieMapper.mapToDtos(movies);
  }

  public List<YearCounter> getMoviesByYear() {
    List<String> years = new ArrayList<>(Arrays.asList("2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"));
    List<YearCounter> moviesCounter = new ArrayList<>();
    years.forEach(year -> {
      YearCounter yearCounter = new YearCounter();
      yearCounter.setYear(year);
      yearCounter.setCount(this.movieRepository.countAllByReleaseDateStartingWith(year));
      moviesCounter.add(yearCounter);
    });
    return moviesCounter;
  }

}

