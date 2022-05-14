package com.ihu.imdbback.repository;

import com.ihu.imdbback.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, String> {

  boolean existsByUser_EmailAndMovieId(String userId, Integer movieId);

}
