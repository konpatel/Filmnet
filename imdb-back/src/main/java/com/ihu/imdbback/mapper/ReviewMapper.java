package com.ihu.imdbback.mapper;

import com.ihu.imdbback.dto.ReviewDTO;
import com.ihu.imdbback.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = {MovieMapper.class})
public interface ReviewMapper {

  Review map(ReviewDTO dto);

  ReviewDTO map(Review entity);

  List<ReviewDTO> mapToDtos(List<Review> entities);

}
