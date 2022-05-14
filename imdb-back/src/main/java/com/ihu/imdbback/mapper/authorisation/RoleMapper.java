package com.ihu.imdbback.mapper.authorisation;

import com.ihu.imdbback.dto.authorisation.RoleDTO;
import com.ihu.imdbback.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RoleMapper {

  Role map(RoleDTO dto);

  RoleDTO map(Role entity);

}
