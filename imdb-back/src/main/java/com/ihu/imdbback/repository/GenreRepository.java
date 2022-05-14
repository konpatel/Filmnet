package com.ihu.imdbback.repository;

import com.ihu.imdbback.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
}
