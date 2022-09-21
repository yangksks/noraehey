package com.singsong.api.service;

import com.singsong.db.entity.Member;
import com.singsong.db.entity.Tag;

import java.util.List;

public interface TagService {
     List<Tag> getMyInfo(Member member);

     void addMemberTag(Member member, int tagId);
     void removeMemberTag(Member member, int tagId);

}
