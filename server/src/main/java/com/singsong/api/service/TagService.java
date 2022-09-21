package com.singsong.api.service;

import com.singsong.api.response.MyInfoRes;
import com.singsong.db.entity.Member;

public interface TagService {
     MyInfoRes getMyInfo(Member member);

     void addMemberTag(Member member, int tagId);
     void removeMemberTag(Member member, int tagId);

}
