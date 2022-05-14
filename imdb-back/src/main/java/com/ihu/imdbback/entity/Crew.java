package com.ihu.imdbback.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity(name = "CREW")
public class Crew {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  private Integer id;

  @Column(name = "name")
  private String name;

  @Column(name = "gender")
  private String gender;

  @Column(name = "popularity")
  private Double popularity;

  @Column(name = "profile_path")
  private String profilePath;

  @Column(name = "known_for_department")
  private String knownForDepartment;

  @Column(name = "job")
  private String job;

  @Column(name = "biography")
  private String biography;

  @Column(name = "birthday")
  private String birthday;

  @Column(name = "deathday")
  private String deathday;

  @Column(name = "place_of_birth")
  private String placeOfBirth;

}
