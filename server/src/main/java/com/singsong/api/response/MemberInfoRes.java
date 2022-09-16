package com.singsong.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MemberInfoRes {
    private Long memberId;
    private String email;
    private String nickName;
    private String profileUrl;
    private int gender;
    private int songHighPitch;
    private List<String> memberTagList;
}
