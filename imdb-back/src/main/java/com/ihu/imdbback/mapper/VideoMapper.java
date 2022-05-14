package com.ihu.imdbback.mapper;

import com.ihu.imdbback.dto.VideoDTO;
import com.ihu.imdbback.entity.Video;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = {MovieMapper.class})
public interface VideoMapper {

  Video map(VideoDTO dto);

  VideoDTO map(Video entity);

  List<VideoDTO> mapToDtos(List<Video> entities);

}
