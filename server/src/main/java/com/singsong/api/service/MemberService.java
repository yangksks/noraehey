package com.singsong.api.service;

import com.singsong.common.model.response.KakaoMemberInfo;
import com.singsong.db.entity.Member;

public interface MemberService {
    Member getMemberByMemberEmail(String memberEmail);

    // 회원가입
    Member createMember(KakaoMemberInfo kakaoMemberInfo);

    void saveRefreshToken(Member member, String token);

}
