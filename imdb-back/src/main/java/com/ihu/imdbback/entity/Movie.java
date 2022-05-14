package com.ihu.imdbback.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity(name = "MOVIES")
public class Movie {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  private Integer id;

  @Column(name = "title")
  private String title;

  @Column(name = "imdb_id")
  private String imdbId;

  @Column(name = "budget")
  private Integer budget;

  @Column(name = "overview")
  private String overview;

  @Column(name = "poster_path")
  private String posterPath;

  @Column(name = "up_coming")
  private boolean upComing;

  @Column(name = "release_date")
  private String releaseDate;

  @Column(name = "original_language")
  private String originalLanguage;

  @Column(name = "run_time")
  private Integer runtime;

  @Column(name = "vote_average")
  private Double voteAverage;

  @Column(name = "vote_count")
  private Integer voteCount;

  @Column(name = "popularity")
  private Double popularity;

  @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(
    name = "MOVIES_TO_GENRES",
    joinColumns = @JoinColumn(name = "movie_id"),
    foreignKey = @ForeignKey(name = "FK_MOVIE_MOVIE_TO_GENRE"),
    inverseJoinColumns = @JoinColumn(name = "genre_id",
      foreignKey = @ForeignKey(name = "FK_GENRE_MOVIE_TO_GENRE")))
  Set<Genre> genres;

  @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(
    name = "MOVIES_TO_CREW",
    joinColumns = @JoinColumn(name = "movie_id"),
    foreignKey = @ForeignKey(name = "FK_MOVIE_MOVIE_TO_CREW"),
    inverseJoinColumns = @JoinColumn(name = "crew_id",
      foreignKey = @ForeignKey(name = "FK_CREW_MOVIE_TO_CREW")))
  Set<Crew> crewSet;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "movie")
  @LazyCollection(LazyCollectionOption.FALSE)
  @JsonIgnore
  List<Review> reviews;

  @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JoinColumn(name = "video_id")
  private Video video;

}
