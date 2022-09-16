package com.singsong.db.repository;

import com.singsong.db.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    Song findSongBySongId(Long songId);
}
