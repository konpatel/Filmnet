package com.ihu.imdbback.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity(name = "VIDEOS")
public class Video {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  private String id;

  @Column(name = "param")
  private String param;

}
