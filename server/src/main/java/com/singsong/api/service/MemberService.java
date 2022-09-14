package com.singsong.api.service;

import com.singsong.db.entity.Member;

public interface MemberService {
    Member getMemberByMemberEmail(String memberEmail);
}
