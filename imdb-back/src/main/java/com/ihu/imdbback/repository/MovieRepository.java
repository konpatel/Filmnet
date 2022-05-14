package com.ihu.imdbback.repository;

import com.ihu.imdbback.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

  boolean existsById(Integer id);

  Page<Movie> findAllByOrderByPopularityDesc(Pageable pageable);
  List<Movie> findAllByUpComingTrue();
  Page<Movie> findAllByOrderByVoteAverageDesc(Pageable pageable);
  Page<Movie> findAllByUpComingIsOrderByReleaseDateDesc(boolean upComing, Pageable pageable);
  Page<Movie> findAllByGenresId(Pageable pageable, Integer id);
  Page<Movie> findAllByCrewSetId(Pageable pageable, Integer id);

  long count();
  Page<Movie> findAll(Pageable pageable);

  @Query("select m from MOVIES m where LOWER(m.title) LIKE LOWER(CONCAT('%', :filter,'%'))")
  Page<Movie> findAllWithPartOfTitle(Pageable pageable, String filter);

  @Query("select m from MOVIES m order by m.popularity desc")
  Page<Movie> findTop10(Pageable pageable);

  long countAllByReleaseDateStartingWith(String value);

}
