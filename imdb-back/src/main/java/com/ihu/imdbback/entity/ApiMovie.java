package com.ihu.imdbback.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ApiMovie {

  private Integer page;
  private List<Map> results;
  private Integer total_results;
  private Integer total_pages;

}
