package com.ihu.imdbback.repository;

import com.ihu.imdbback.entity.Crew;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewRepository extends JpaRepository<Crew, Integer> {

  Page<Crew> findAll(Pageable pageable);
  Page<Crew> findAllByName(Pageable pageable, String filterValue);
  Page<Crew> findAllByKnownForDepartment(Pageable pageable, String filterValue);
  Page<Crew> findAllByJob(Pageable pageable, String filterValue);

}
