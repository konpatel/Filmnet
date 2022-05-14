package com.ihu.imdbback.mapper.authorisation;

import com.ihu.imdbback.dto.authorisation.AuthUserDTO;
import com.ihu.imdbback.entity.AuthUser;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AuthUserMapper {

  AuthUser map(AuthUserDTO dto);

  AuthUserDTO map(AuthUser entity);

  List<AuthUserDTO> mapToDtos(List<AuthUser> entities);


}
