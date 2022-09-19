package com.singsong.api.controller;

import com.singsong.api.response.MemberInfoRes;
import com.singsong.api.response.MemberTokenRes;
import com.singsong.api.service.MemberService;
import com.singsong.api.service.TagService;
import com.singsong.common.util.JwtTokenUtil;
import com.singsong.common.util.auth.MemberDetails;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.RefreshToken;
import com.singsong.db.entity.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    TagService tagService;

    @GetMapping("/info")
    public ResponseEntity<?> memberDetails(@ApiIgnore Authentication authentication) {

        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();

        List<Tag> tags = tagService.getMemberTagListByMember(member);

        MemberInfoRes memberInfoRes = MemberInfoRes.builder()
                .memberId(member.getMemberId())
                .email(member.getMemberEmail())
                .nickName(member.getMemberNickname())
                .songHighPitch(member.getMemberHighPitch())
                .profileUrl(member.getMemberProfileUrl())
                .memberTagList(tags)
                .build();

        return ResponseEntity.status(200).body(memberInfoRes);
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> tokenRefresh(@RequestHeader(value = "REFRESH-TOKEN") String refreshToken) {

        RefreshToken newRefreshToken = memberService.modifyRefreshToken(refreshToken);

        String accessToken = JwtTokenUtil.getToken(newRefreshToken.getMember().getMemberEmail());
        Map<String, String> tokens = new HashMap<>();

        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", newRefreshToken.getRefreshToken().replace("Bearer ", ""));

        MemberTokenRes memberTokenRes = MemberTokenRes.builder()
                .accessToken(tokens.get("accessToken"))
                .refreshToken(tokens.get("refreshToken"))
                .build();

        return ResponseEntity.status(200).body(memberTokenRes);
    }

    @PatchMapping("/tag/delete")
    public ResponseEntity<?> memberTagDelete(@RequestParam(value = "tag") int tagId, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        tagService.deleteMemberTag(member, tagId);

        return ResponseEntity.status(200).build();
    }

    @PatchMapping("/tag/add")
    public ResponseEntity<?> memberTagAdd(@RequestParam(value = "tag") int tagId, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        tagService.addMemberTag(member, tagId);

        return ResponseEntity.status(200).build();
    }

}
