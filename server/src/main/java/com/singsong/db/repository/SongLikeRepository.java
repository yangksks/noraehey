package com.singsong.db.repository;

import com.singsong.db.entity.Song;
import com.singsong.db.entity.SongLike;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongLikeRepository extends JpaRepository<SongLike, Long> {
    Optional<SongLike> findBySongSongIdAndMemberMemberId(Long songId, Long memberId);
    @Query("SELECT s FROM Song s JOIN SongLike l ON s.songId = l.song.songId WHERE l.member.memberId = :memberId ORDER BY l.songLikeId DESC")
    List<Song> findAllByMemberMemberId(@Param("memberId") Long memberId, Pageable pageable);
}
