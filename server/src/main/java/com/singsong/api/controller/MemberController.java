package com.singsong.api.controller;

import com.singsong.api.response.MemberInfoRes;
import com.singsong.api.response.MemberTokenRes;
import com.singsong.api.response.MyInfoRes;
import com.singsong.api.service.MemberService;
import com.singsong.api.service.TagService;
import com.singsong.common.util.JwtAuthenticationUtil;
import com.singsong.common.util.auth.MemberDetails;
import com.singsong.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Map;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;
    @Autowired
    MemberService memberService;

    @Autowired
    TagService tagService;

    @GetMapping("/refresh")
    public ResponseEntity<?> tokenRefresh(@RequestHeader(value = "REFRESH-TOKEN") String refreshToken) {

        MemberTokenRes memberTokenRes = memberService.modifyRefreshToken(refreshToken);

        return ResponseEntity.status(200).body(memberTokenRes);
    }

    @GetMapping("/info")
    public ResponseEntity<?> myInfoDetail(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        MyInfoRes myInfoRes = tagService.getMyInfo(member);

        return ResponseEntity.status(200).body(myInfoRes);
    }

    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> nickNameValidate(@PathVariable String nickname) {

        return memberService.getMemberByNickname(nickname);
    }

    @PatchMapping("/nickname")
    public ResponseEntity<?> nickNameModify(@ApiIgnore Authentication authentication,
                                            @RequestBody Map<String,String> req) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        memberService.modifyNickName(member,req.get("nickname"));

        return ResponseEntity.status(200).build();
    }

    @PatchMapping("/delete")
    public ResponseEntity<?> memberRemove(@ApiIgnore Authentication authentication){
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        memberService.removeMember(member);

        return ResponseEntity.status(200).build();
    }

    @PatchMapping("/tag/add")
    public ResponseEntity<?> memberTagAdd(@RequestParam(value = "tag") int tagId, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        tagService.addMemberTag(member, tagId);

        return ResponseEntity.status(200).build();
    }

    @PatchMapping("/tag/delete")
    public ResponseEntity<?> memberTagDelete(@RequestParam(value = "tag") int tagId, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        tagService.removeMemberTag(member, tagId);

        return ResponseEntity.status(200).build();
    }

    @PatchMapping("/highpitch")
    public  ResponseEntity<?> highPitchModifiy(@RequestParam(value="highpitch") int highPitch, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();

        memberService.modifyHighPitch(member,highPitch);

        return ResponseEntity.status(200).build();
    }

    @GetMapping("/info/{memberId}")
    public ResponseEntity<?> memberDetail(@PathVariable Long memberId) {

        MemberInfoRes memberInfoRes = memberService.getMemberInfoRes(memberId);
        return  ResponseEntity.status(200).body(memberInfoRes);
    }

}
