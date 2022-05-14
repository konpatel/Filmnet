package com.ihu.imdbback.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter
@Entity(name = "REVIEWS")
public class Review {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String id;

  @Column(name = "author")
  private String author;

  @Column(name = "content")
  private String content;

  @Column(name = "created_date")
  private String createdDate;

  @Column(name = "rating")
  private Double rating;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "users_id")
  @JsonIgnore
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "movie_id")
  @JsonIgnore
  private Movie movie;

}
