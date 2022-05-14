package com.ihu.imdbback.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity(name = "GENRES")
public class Genre {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  private Integer id;

  @Column(name = "name")
  private String name;

}
