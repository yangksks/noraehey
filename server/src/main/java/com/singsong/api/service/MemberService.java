package com.singsong.api.service;

import com.singsong.common.model.response.KakaoMemberInfo;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.RefreshToken;

public interface MemberService {
    Member getMemberByMemberEmail(String memberEmail);
    Member getMemberByMemberId(Long memberId);
    // 회원가입
    Member createMember(KakaoMemberInfo kakaoMemberInfo);

    void saveRefreshToken(Member member, String token);
    RefreshToken modifyRefreshToken(String refreshToken);

}
