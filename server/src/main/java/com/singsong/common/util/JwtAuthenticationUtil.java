package com.singsong.common.util;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.singsong.api.service.MemberService;
import com.singsong.api.service.MemberServiceImpl;
import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.common.exception.member.MemberUnauthorizedException;
import com.singsong.common.util.auth.MemberDetails;
import com.singsong.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class JwtAuthenticationUtil {

    @Autowired
    MemberService memberService;

    public Member jwtTokenAuth(Authentication authentication) {
        if (authentication == null) throw new MemberUnauthorizedException("member unauthorized", ErrorCode.Member_Unauthorized);
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        if (memberDetails == null) throw new MemberUnauthorizedException("member unauthorized", ErrorCode.Member_Unauthorized);
        String email = memberDetails.getUsername();
        Member member = memberService.getMemberByMemberEmail(email);
        if (member == null) throw new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND);
        return member;
    }
}
