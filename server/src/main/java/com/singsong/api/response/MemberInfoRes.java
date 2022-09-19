package com.singsong.api.response;

import com.singsong.db.entity.Tag;
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
    private List<Tag> memberTagList;
}
