package com.singsong.api.controller;

import com.singsong.api.response.MemberInfoRes;
import com.singsong.common.util.auth.MemberDetails;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.MemberTag;
import com.singsong.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberRepository memberRepository;

    // Todo: Exception 클래스 만들면 에러처리해야됩니다.
    @GetMapping("/info")
    public ResponseEntity<?> memberDetails(@ApiIgnore Authentication authentication) {

        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        String memberEmail = memberDetails.getUsername();
        Member member = memberRepository.findByMemberEmail(memberEmail);

        // Todo : 다대다 연결테이블 조인과 관련된 더 효율적인 방법이 있으면 교체
        List<MemberTag> memberTags = member.getMemberTag();
        List<String> tags = new ArrayList<>();

        for (int i = 0; i<memberTags.size(); i++)
            tags.add(memberTags.get(i).getTag().getTagName());

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

}
