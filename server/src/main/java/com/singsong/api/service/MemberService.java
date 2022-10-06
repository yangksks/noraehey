package com.singsong.api.service;

import com.singsong.common.model.response.KakaoMemberInfo;
import com.singsong.db.entity.Member;

import java.util.Map;

public interface MemberService {
    Map<String, String> modifyRefreshToken(String oldRefreshToken);
    Member getMemberByMemberEmail(String memberEmail);
    Member getMemberByMemberId(Long memberId);
    // 회원가입

    Member createMember(KakaoMemberInfo kakaoMemberInfo);
    void saveRefreshToken(Member member, String token);

    void modifyHighPitch(Member member,int highPitch);

    void modifyNickName(Member member,String nickname);

    void getMemberByNickname(String nickname);

    Member getMemberInfoRes(Long memberId);

    void removeMember(Member member);

    void modifyProfile(Member member, String s3Url);
}
