package com.ihu.imdbback.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApiResult {

  private Integer id;
  private String poster_path;
  private String overview;
  private String release_date;
  private List<Integer> genre_ids;
  private String original_title;
  private Integer popularity;
  private Integer vote_average;

}
