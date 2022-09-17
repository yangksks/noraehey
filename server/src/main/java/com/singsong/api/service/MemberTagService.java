package com.singsong.api.service;

import com.singsong.db.entity.Member;

import java.util.List;

public interface MemberTagService {
     List<String> getMemberTagListByMember(Member member);
}
