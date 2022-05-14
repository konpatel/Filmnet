package com.ihu.imdbback.service;

import com.ihu.imdbback.dto.CrewDTO;
import com.ihu.imdbback.entity.Crew;
import com.ihu.imdbback.mapper.CrewMapper;
import com.ihu.imdbback.repository.CrewRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CrewService {

  private final CrewMapper crewMapper;
  private CrewRepository crewRepository;

  public Page<CrewDTO> getCrewPeople(Pageable pageable, String filterValue) {
    Pageable paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
    Page<Crew> pagedResult;
    if (filterValue != null) {
      pagedResult = this.checkFilterValue(filterValue, paging);
    } else {
      pagedResult = crewRepository.findAll(paging);
    }
    return pagedResult.map(crewMapper::map);
  }

  public Page<Crew> checkFilterValue(String filterValue, Pageable paging) {
    Page<Crew> pagedResult;
    if (filterValue.equals("Acting")) {
      pagedResult = crewRepository.findAllByKnownForDepartment(paging, filterValue);
    } else if (filterValue.equals("Director")) {
      pagedResult = crewRepository.findAllByJob(paging, filterValue);
    } else {
      pagedResult = crewRepository.findAllByName(paging, filterValue);
    }
    return pagedResult;
  }

  public CrewDTO getCrewById(Integer id) {
    Optional<Crew> crew = crewRepository.findById(id);
    return crewMapper.map(crew.get());
  }

}
