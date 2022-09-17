package com.singsong.db.repository;

import com.singsong.common.model.dto.MemberTagMapping;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.MemberTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {

    Optional<List<MemberTagMapping>> findByMember(Member member);
}
