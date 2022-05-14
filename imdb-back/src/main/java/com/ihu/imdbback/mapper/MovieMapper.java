package com.ihu.imdbback.mapper;

import com.ihu.imdbback.dto.MovieDTO;
import com.ihu.imdbback.entity.Movie;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = {GenreMapper.class,
  CrewMapper.class, ReviewMapper.class, VideoMapper.class, UserMapper.class})
public interface MovieMapper {

  Movie map(MovieDTO dto);

  MovieDTO map(Movie entity);

  List<MovieDTO> mapToDtos(List<Movie> entities);

}
