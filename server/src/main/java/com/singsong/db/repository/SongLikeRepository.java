package com.singsong.db.repository;

import com.singsong.db.entity.SongLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SongLikeRepository extends JpaRepository<SongLike, Long> {
    Optional<SongLike> findBySongSongIdAndMemberMemberId(Long songId, Long memberId);
}
