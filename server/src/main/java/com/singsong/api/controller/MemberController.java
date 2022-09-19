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
        MemberInfoRes memberInfoRes = tagService.getMemberInfoRes(member);

        return ResponseEntity.status(200).body(memberInfoRes);
    }

    @PatchMapping("/tag/add")
    public ResponseEntity<?> memberTagAdd(@RequestParam(value="tag") int tagId, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        tagService.addMemberTag(member,tagId);

        return ResponseEntity.status(200).build();
    }

    @PatchMapping("/tag/delete")
    public ResponseEntity<?> memberTagDelete(@RequestParam(value="tag") int tagId, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        tagService.deleteMemberTag(member,tagId);

        return ResponseEntity.status(200).build();
    }

    @PatchMapping("/highpitch")
    public  ResponseEntity<?> highPitchModifiy(@RequestParam(value="highpitch") int highPitch, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();

        memberService.modifyHighPitch(member,highPitch);

        return ResponseEntity.status(200).build();
    }

}
