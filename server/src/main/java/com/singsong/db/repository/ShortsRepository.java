package com.singsong.db.repository;

import com.singsong.db.entity.Shorts;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShortsRepository extends JpaRepository<Shorts, Long> {
    List<Shorts> findAllBySongSongId(Long songId, Pageable pageable);
    List<Shorts> findAllByMemberMemberId(Long memberId, Pageable pageable);

    @Query(value = "select * from shorts order by rand() limit 3", nativeQuery = true)
    List<Shorts> findByRandom();
}
