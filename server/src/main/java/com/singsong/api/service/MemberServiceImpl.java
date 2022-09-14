package com.singsong.api.service;

import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.db.entity.Member;
import com.singsong.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    MemberRepository memberRepository;

    @Override
    public Member getMemberByMemberEmail(String memberEmail) {
        Member member = memberRepository.findByMemberEmail(memberEmail);
        if(member == null){
            throw new MemberNotFoundException("해당 이메일 주소를 가진 회원 정보가 존재하지 않습니다.", ErrorCode.MEMBER_NOT_FOUND);
        }
        return member;
    }
}
