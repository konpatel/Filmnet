package com.ihu.imdbback.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {

  private String id;

  private String author;

  private String content;

  private String createdDate;

  private Double rating;

}
