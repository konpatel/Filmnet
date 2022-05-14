package com.ihu.imdbback.repository;

import com.ihu.imdbback.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, String> {
}
