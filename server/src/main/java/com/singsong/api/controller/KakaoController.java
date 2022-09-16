package com.singsong.api.controller;

import com.singsong.api.response.KakaoLoginPostRes;
import com.singsong.api.service.KakaoService;
import com.singsong.api.service.MemberService;
import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.common.model.response.KakaoMemberInfo;
import com.singsong.common.util.JwtTokenUtil;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.RefreshToken;
import com.singsong.db.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/kakao")
public class KakaoController {

    @Autowired
    KakaoService kakaoService;
    @Autowired
    MemberService memberService;

    @Value("${kakao.restkey}")
    String kakaoRestKey;

    // 인가 코드 요청
    @GetMapping("/login")
    public String kakaoConnect() {
        StringBuffer url = new StringBuffer();
        url.append("https://kauth.kakao.com/oauth/authorize?");
        url.append("client_id=" + kakaoRestKey);
        // TODO: redirect url 수정
        url.append("&redirect_uri=http://localhost:8081/api/kakao/callback");
        url.append("&response_type=code");
        return "redirect:" + url;
    }

    @GetMapping("/callback")
    public ResponseEntity<?> kakaoCallback(@RequestParam String code) throws IOException {
        String accessToken = kakaoService.getKakaoAccessToken(code);
        KakaoMemberInfo kakaoMemberInfo = kakaoService.getKakaoEmailAndKakaoId(accessToken);
        Member member = memberService.getMemberByMemberEmail(kakaoMemberInfo.getEmail());
        // DB에 이메일 없다면 회원가입
        if (member == null) {
            member = memberService.createMember(kakaoMemberInfo);
        }
        // accessToken, refreshToken 생성
        Map<String, String> tokens = JwtTokenUtil.generateTokenSet(member.getMemberEmail());

        // refreshToken DB에 초기화
        memberService.saveRefreshToken(member, tokens.get("refreshToken"));

        KakaoLoginPostRes kakaoLoginPostRes = KakaoLoginPostRes.builder()
                .accessToken(tokens.get("accessToken"))
                .refreshToken(tokens.get("refreshToken"))
                .build();

        return ResponseEntity.status(200).body(kakaoLoginPostRes);


    }
}
