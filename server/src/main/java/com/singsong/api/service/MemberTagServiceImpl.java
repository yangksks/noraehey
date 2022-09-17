package com.singsong.api.service;

import com.singsong.common.model.dto.MemberTagMapping;
import com.singsong.db.entity.Member;
import com.singsong.db.repository.MemberTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberTagServiceImpl implements MemberTagService {

    @Autowired
    MemberTagRepository memberTagRepository;

    @Override
    public List<String> getMemberTagListByMember(Member member) {

        List<MemberTagMapping> memberTagList = memberTagRepository.findByMember(member).orElse(new ArrayList<>());

        List<String> tags = new ArrayList<>();
        for (MemberTagMapping tag : memberTagList) {
            tags.add(tag.getTag().getTagName());
        }

        return tags;
    }
}
