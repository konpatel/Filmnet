package com.ihu.imdbback.mapper;

import com.ihu.imdbback.dto.GenreDTO;
import com.ihu.imdbback.entity.Genre;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = {MovieMapper.class})
public interface GenreMapper {

  Genre map(GenreDTO dto);

  GenreDTO map(Genre entity);

  List<GenreDTO> mapToDtos(List<Genre> entities);

}
