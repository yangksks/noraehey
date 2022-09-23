package com.singsong.api.service;

import com.singsong.db.entity.Member;
import com.singsong.db.entity.Tag;

import java.util.List;

public interface TagService {
     List<Tag> getMyInfo(Member member);

     void modifyMemberTags(Member member, List<Long> tagIdList);
     void addMemberTag(Member member, Long tagId);
     void removeMemberTag(Member member, Long tagId);
     List<String> getTagNameList(List<Long> tagIdList);
     List<Tag> getTagList();
}
