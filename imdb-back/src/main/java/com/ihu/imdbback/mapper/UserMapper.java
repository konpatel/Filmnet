package com.ihu.imdbback.mapper;

import com.ihu.imdbback.dto.UserDTO;
import com.ihu.imdbback.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = {MovieMapper.class})
public interface UserMapper {

  User map(UserDTO dto);

  UserDTO map(User entity);

  List<UserDTO> mapToDtos(List<User> entities);

  void map(UserDTO userDTO, @MappingTarget User entity);


}
