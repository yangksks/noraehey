package com.singsong.db.repository;

import com.singsong.db.entity.ShortsLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortsLikeRepository extends JpaRepository<ShortsLike, Long> {
    ShortsLike findByShortsShortsIdAndMemberMemberId(Long shortsId, Long memberId);
    Long countByShortsShortsId(Long shortsId);

    void deleteByMemberMemberIdAndAndShortsShortsId(Long memberId, Long shortsId);
}
