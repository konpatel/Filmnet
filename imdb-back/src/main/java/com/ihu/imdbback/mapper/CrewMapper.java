package com.ihu.imdbback.mapper;

import com.ihu.imdbback.dto.CrewDTO;
import com.ihu.imdbback.entity.Crew;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = {MovieMapper.class})
public interface CrewMapper {

  Crew map(CrewDTO dto);

  CrewDTO map(Crew entity);

  List<CrewDTO> mapToDtos(List<Crew> entities);

}
