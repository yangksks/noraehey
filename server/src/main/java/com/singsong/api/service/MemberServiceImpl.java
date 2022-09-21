package com.singsong.api.service;

import com.singsong.api.response.MemberInfoRes;
import com.singsong.api.response.MemberTokenRes;
import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.common.exception.member.MemberUnauthorizedException;
import com.singsong.common.model.response.BaseResponseBody;
import com.singsong.common.model.response.KakaoMemberInfo;
import com.singsong.common.util.JwtTokenUtil;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.RefreshToken;
import com.singsong.db.repository.MemberRepository;
import com.singsong.db.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Override
    public Member getMemberByMemberEmail(String memberEmail) {
        Member member = memberRepository.findByMemberEmail(memberEmail).orElse(null);
        return member;
    }

    @Override
    public Member getMemberByMemberId(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND));
        return member;
    }

    // 회원가입
    @Override
    public Member createMember(KakaoMemberInfo kakaoMemberInfo) {
        // TODO: 기본값 수정
        Member member = Member.builder()
                .memberEmail(kakaoMemberInfo.getEmail())
                .memberNickname("노래쟁이 #" + kakaoMemberInfo.getId())
                // TODO: S3에 저장된 기본 프로필 이미지
                .memberProfileUrl(null)
                .memberHighPitch(0)
                .memberRole(1)
                .build();

        memberRepository.save(member);
        return member;
    }

    @Override
    public void saveRefreshToken(Member member, String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByMemberMemberId(member.getMemberId()).orElse(null);
        if (refreshToken != null) {
            refreshToken.updateRefreshToken(token);
        } else {
            refreshToken = RefreshToken.builder()
                    .refreshToken(token)
                    .member(member)
                    .build();
        }
        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public MemberTokenRes modifyRefreshToken(String oldRefreshToken) {
        // refreshToken 정보 조회
        RefreshToken originRefreshToken = refreshTokenRepository.findByRefreshToken(oldRefreshToken)
                .orElseThrow(() -> new MemberUnauthorizedException("잘못된 토큰입니다.", ErrorCode.Member_Unauthorized) );

        Member member = originRefreshToken.getMember();

        RefreshToken newRefreshToken = jwtTokenUtil.reGenerateRefreshToken(member, originRefreshToken);

        String accessToken = JwtTokenUtil.getToken(member.getMemberEmail());
        String refreshToken = newRefreshToken.getRefreshToken().replace("Bearer ", "");

        return  MemberTokenRes.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void modifyHighPitch(Member member, int highPitch) {
        member.setMemberHighPitch(highPitch);
        memberRepository.save(member);
    }

    @Override
    public void modifyNickName(Member member, String nickname) {
        member.setMemberNickname(nickname);
        System.out.println(member);
        memberRepository.save(member);
    }

    @Override
    public ResponseEntity<?> getMemberByNickname(String nickname) {

        if(nickname.length() > 20)
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "LENGTH_ERROR"));

        if(memberRepository.findByMemberNickname(nickname).isPresent())
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "DUPLICATION_ERROR"));

        return  ResponseEntity.status(200).build();
    }

    @Override
    public MemberInfoRes getMemberInfoRes(Long memberId) {

        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND));

        MemberInfoRes memberInfoRes = MemberInfoRes.builder()
                .memberNickname(member.getMemberNickname())
                .memberProfileUrl(member.getMemberProfileUrl())
                .build();

        return memberInfoRes;
    }
}
