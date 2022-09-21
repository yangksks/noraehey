package com.singsong.api.service;

import com.singsong.api.response.MyInfoRes;
import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.tag.TagDuplicationException;
import com.singsong.common.exception.tag.TagNotFoundException;
import com.singsong.common.model.dto.MemberTagMapping;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.MemberTag;
import com.singsong.db.entity.Tag;
import com.singsong.db.repository.MemberTagRepository;
import com.singsong.db.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    MemberTagRepository memberTagRepository;
    @Autowired
    TagRepository tagRepository;

    @Override
    public MyInfoRes getMyInfo(Member member) {

        List<MemberTagMapping> memberTagList = memberTagRepository.findByMember(member);

        List<Tag> tags = new ArrayList<>();
        for (MemberTagMapping tag : memberTagList) {
            tags.add(tag.getTag());
        }

        return MyInfoRes.builder()
                .memberId(member.getMemberId())
                .email(member.getMemberEmail())
                .nickName(member.getMemberNickname())
                .songHighPitch(member.getMemberHighPitch())
                .profileUrl(member.getMemberProfileUrl())
                .memberTagList(tags)
                .build();
    }

    @Override
    public void addMemberTag(Member member, int tagId) {

        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new TagNotFoundException("존재하지 않는 태그입니다.", ErrorCode.TAG_NOT_FOUND));

        if(memberTagRepository.findByMemberAndTag(member,tag).isPresent())
            throw new TagDuplicationException("이미 추가된 태그입니다.", ErrorCode.TAG_DUPLICATION);

        MemberTag memberTag = MemberTag.builder()
                .member(member)
                .tag(tag)
                .build();

        memberTagRepository.save(memberTag);
    }

    @Override
    public void removeMemberTag(Member member, int tagId) {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new TagNotFoundException("존재하지 않는 태그입니다.", ErrorCode.TAG_NOT_FOUND));

        if(!memberTagRepository.findByMemberAndTag(member,tag).isPresent())
            throw new TagNotFoundException("추가되지 않은 태그입니다.", ErrorCode.TAG_NOT_FOUND);

        memberTagRepository.deleteByMemberAndTag(member,tag);
    }

}
