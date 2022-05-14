package com.ihu.imdbback.dto;

import com.ihu.imdbback.entity.Video;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class MovieDTO {

  private Integer id;

  private String title;

  private String imdbId;

  private Integer budget;

  private String overview;

  private String posterPath;

  private boolean upComing;

  private String releaseDate;

  private String originalLanguage;

  private Integer runtime;

  private Double voteAverage;

  private Integer voteCount;

  private Double popularity;

  private Set<GenreDTO> genres;

  private Set<CrewDTO> crewSet;

  private Set<ReviewDTO> reviews;

  private Video video;

}
