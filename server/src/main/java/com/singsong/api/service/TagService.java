package com.singsong.api.service;

import com.singsong.db.entity.Member;

import java.util.List;

public interface TagService {
     List<String> getMemberTagListByMember(Member member);

     void addMemberTag(Member member, String tag);
}
