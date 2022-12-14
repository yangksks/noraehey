package com.singsong.common.util.auth;

import com.singsong.api.service.MemberService;
import com.singsong.db.entity.Member;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
public class MemberDetailService implements UserDetailsService {
    final MemberService memberService;

    public MemberDetailService(@Lazy MemberService memberService) {
        this.memberService = memberService;
    }

    @Override
    public UserDetails loadUserByUsername(String memberEmail) throws UsernameNotFoundException {
        Member member = memberService.getMemberByMemberEmail(memberEmail);
        if (member != null) {
            MemberDetails memberDetails = new MemberDetails(member);
            return memberDetails;
        }
        return null;
    }
}
