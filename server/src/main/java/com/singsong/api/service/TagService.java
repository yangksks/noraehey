package com.singsong.api.service;

import com.singsong.api.response.MemberInfoRes;
import com.singsong.db.entity.Member;

public interface TagService {
     MemberInfoRes getMemberInfoRes(Member member);

     void addMemberTag(Member member, int tagId);
     void deleteMemberTag(Member member,int tagId);
}
