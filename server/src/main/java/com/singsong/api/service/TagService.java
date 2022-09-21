package com.singsong.api.service;

import com.singsong.api.response.MyInfoRes;
import com.singsong.db.entity.Member;

import java.util.List;

public interface TagService {
     MyInfoRes getMyInfo(Member member);

     void addMemberTag(Member member, Long tagId);
     void deleteMemberTag(Member member,Long tagId);

     void modifyMemberTags(Member member, List<Long> tagIdList);
}
