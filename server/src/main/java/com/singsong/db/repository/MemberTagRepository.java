package com.singsong.db.repository;

import com.singsong.common.model.dto.MemberTagMapping;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.MemberTag;
import com.singsong.db.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {

    List<MemberTagMapping> findByMember(Member member);
    Optional<MemberTag> findByMemberAndTag(Member member, Tag tag);
    List<MemberTag> findAllByMember(Member member);

    @Transactional
    void deleteByMemberAndTag(Member member, Tag tag);
    @Transactional
    void deleteAllByMemberMemberId(Long memberId);
}
