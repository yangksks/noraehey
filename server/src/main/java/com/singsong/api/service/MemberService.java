package com.singsong.api.service;

import com.singsong.common.model.response.KakaoMemberInfo;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.RefreshToken;
import org.springframework.http.ResponseEntity;

public interface MemberService {
    Member getMemberByMemberEmail(String memberEmail);
    Member getMemberByMemberId(Long memberId);
    // 회원가입
    Member createMember(KakaoMemberInfo kakaoMemberInfo);

    void saveRefreshToken(Member member, String token);
    RefreshToken modifyRefreshToken(String refreshToken);

    void modifyHighPitch(Member member,int highPitch);

    void modifyNickName(Member member,String nickname);

    ResponseEntity<?> getMemberByNickname(String nickname);
}
