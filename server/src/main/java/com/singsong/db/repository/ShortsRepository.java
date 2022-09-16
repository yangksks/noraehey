package com.singsong.db.repository;

import com.singsong.db.entity.Shorts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShortsRepository extends JpaRepository<Shorts, Long> {
    List<Shorts> findAllBySongSongId(Long songId);
}