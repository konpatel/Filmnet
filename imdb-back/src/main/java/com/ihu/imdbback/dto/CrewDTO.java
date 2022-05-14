package com.ihu.imdbback.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class CrewDTO {

  private Integer id;

  private String name;

  private String gender;

  private Double popularity;

  private String profilePath;

  private String knownForDepartment;

  private String job;

  private String biography;

  private String birthday;

  private String deathday;

  private String placeOfBirth;

}
