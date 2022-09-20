package com.singsong.db.repository;

import com.singsong.db.entity.SongLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SongLevelRepository extends JpaRepository<SongLevel, Long> {
    Optional<SongLevel> findBySongSongIdAndMemberMemberId(Long songId, Long memberId);
}
