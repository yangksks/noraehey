package com.singsong.api.controller;

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

import java.util.Map;


@RestController
@RequestMapping("/kakao")
public class KakaoController {

    @Autowired
    KakaoService kakaoService;
    @Autowired
    MemberService memberService;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    @Value("${kakao.restkey}")
    String kakaoRestKey;
    // 인가 코드 요청
    @GetMapping("/oauth")
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
    public ResponseEntity<?> kakaoCallback(@RequestParam String code) {
        try {
            String accessToken = kakaoService.getKakaoAccessToken(code);
            KakaoMemberInfo kakaoMemberInfo = kakaoService.getKakaoEmailAndKakaoId(accessToken);
            Member member = memberService.getMemberByMemberEmail(kakaoMemberInfo.getEmail());
            // DB에 이메일 없다면 회원가입
            if (member == null) {
                member = memberService.createMember(kakaoMemberInfo);
            }
            // accessToken, refreshToken 만든 후 return
            Map<String, String> tokens = JwtTokenUtil.generateTokenSet(member.getMemberEmail());
            RefreshToken refreshToken = refreshTokenRepository.findByMemberSeq(member.getSeq()).orElse(null);
            if (refreshToken != null) {
                refreshToken.setRefreshToken(tokens.get("refreshToken"));
            } else {
                refreshToken = RefreshToken.builder()
                        .refreshToken(tokens.get("refreshToken"))
                        .member(member)
                        .build();
            }
            refreshTokenRepository.save(refreshToken);


            return null;
        }
        catch (Exception e) {
            // TODO: kakao 관련 exception 생성 후 변경
            throw new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND);
        }


    }
}
