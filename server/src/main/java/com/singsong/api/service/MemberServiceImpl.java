package com.singsong.api.service;

import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.common.model.response.KakaoMemberInfo;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.RefreshToken;
import com.singsong.db.repository.MemberRepository;
import com.singsong.db.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;
    @Override
    public Member getMemberByMemberEmail(String memberEmail) {
        Optional<Member> member = memberRepository.findByMemberEmail(memberEmail);
        return member.orElseThrow(()-> new MemberNotFoundException("해당 이메일로 유저를 찾을 수 없습니다.", ErrorCode.MEMBER_NOT_FOUND));
    }

    // 회원가입
    @Override
    public Member createMember(KakaoMemberInfo kakaoMemberInfo) {
        // TODO: 기본값 수정
        Member member = Member.builder()
                .memberEmail(kakaoMemberInfo.getEmail())
                .memberNickname("노래쟁이 #" + kakaoMemberInfo.getId())
                // TODO: S3에 저장된 기본 프로필 이미지
                .memberProfileUrl(null)
                .memberGender(0)
                .memberHighPitch(0)
                .memberRole(1)
                .build();

        memberRepository.save(member);
        return member;
    }

    @Override
    public void saveRefreshToken(Member member, String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByMemberMemberId(member.getMemberId()).orElse(null);
        if (refreshToken != null) {
            refreshToken.updateRefreshToken(token);
        } else {
            refreshToken = RefreshToken.builder()
                    .refreshToken(token)
                    .member(member)
                    .build();
        }
        refreshTokenRepository.save(refreshToken);
    }

}
