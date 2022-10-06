package com.singsong.db.repository;

import com.singsong.db.entity.Shorts;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShortsRepository extends JpaRepository<Shorts, Long> {

    Optional<Shorts> findByShortsId(Long shortsId);
    Optional<Shorts> findByShortsIdAndAndMemberMemberId(Long shorts, Long memberId);
    void deleteByShortsId(Long shortsId);

    @Query(value = "select s.shorts_id, s.shorts_audio_url, s.shorts_comment, s.shorts_create_time, s.member_id, s.song_id  from shorts as s\n" +
            "left join \n" +
            "(select shorts_id, count(shorts_id) cnt from shorts_like l\n" +
            "group by l.shorts_id) as l\n" +
            "on s.shorts_id = l.shorts_id\n" +
            "order by cnt desc\n" +
            "limit 30", nativeQuery = true)
    List<Shorts> findOrderByLike();
    @Query(value = "select s.shorts_id, s.shorts_audio_url, s.shorts_comment, s.shorts_create_time, s.member_id, s.song_id  from shorts as s\n" +
            "left join \n" +
            "(select shorts_id, count(shorts_id) cnt from shorts_like l\n" +
            "group by l.shorts_id) as l\n" +
            "on s.shorts_id = l.shorts_id\n" +
            "where song_id = :songId\n" +
            "order by cnt desc", nativeQuery = true)
    List<Shorts> findBySongIdOrderByLike(Long songId, Pageable pageable);

    List<Shorts> findBySongSongIdOrderByShortsCreateTimeDesc(Long songId, Pageable pageable);
    List<Shorts> findAllByMemberMemberId(Long memberId, Pageable pageable);

    @Query(value = "select * from shorts order by rand() limit 30", nativeQuery = true)
    List<Shorts> findByRandom();

    @Query(value = "SELECT s.shorts_id, s.shorts_audio_url, s.shorts_comment, s.shorts_create_time, s.member_id, s.song_id FROM shorts_like l\n" +
            "join shorts s\n" +
            "on l.shorts_id = s.shorts_id\n" +
            "where l.member_id = :memberId\n" +
            "order by l.shorts_like_id desc", nativeQuery = true)
    List<Shorts> findByLike(Long memberId, Pageable pageable);
}
