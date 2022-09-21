package com.singsong.api.service;

import com.singsong.api.response.MemberInfoRes;
import com.singsong.api.response.MemberTokenRes;
import com.singsong.common.model.response.KakaoMemberInfo;
import com.singsong.db.entity.Member;
import org.springframework.http.ResponseEntity;

public interface MemberService {
    MemberTokenRes modifyRefreshToken(String oldRefreshToken);
    Member getMemberByMemberEmail(String memberEmail);
    Member getMemberByMemberId(Long memberId);
    // 회원가입

    Member createMember(KakaoMemberInfo kakaoMemberInfo);
    void saveRefreshToken(Member member, String token);

    void modifyHighPitch(Member member,int highPitch);

    void modifyNickName(Member member,String nickname);

    ResponseEntity<?> getMemberByNickname(String nickname);

    MemberInfoRes getMemberInfoRes(Long memberId);

    void removeMember(Member member);

    void modifyProfile(Member member, String s3Url);
}
