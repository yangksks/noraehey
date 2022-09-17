package com.singsong.api.controller;

import com.singsong.api.response.MemberInfoRes;
import com.singsong.api.service.MemberService;
import com.singsong.api.service.TagService;
import com.singsong.common.util.auth.MemberDetails;
import com.singsong.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

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

        List<String> tags = tagService.getMemberTagListByMember(member);

        MemberInfoRes memberInfoRes = MemberInfoRes.builder()
                .memberId(member.getMemberId())
                .email(member.getMemberEmail())
                .gender(member.getMemberGender())
                .nickName(member.getMemberNickname())
                .songHighPitch(member.getMemberHighPitch())
                .profileUrl(member.getMemberProfileUrl())
                .memberTagList(tags)
                .build();

        return ResponseEntity.status(200).body(memberInfoRes);
    }

    @PatchMapping("/tag/add")
    public ResponseEntity<?> memberTagAdd(@RequestParam(value="tag") String tag, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        tagService.addMemberTag(member,tag);

        return ResponseEntity.status(200).build();
    }

}
