package com.singsong.api.response;

import com.singsong.db.entity.Tag;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MyInfoRes {
    private Long memberId;
    private String memberEmail;
    private String memberNickName;
    private String memberProfileUrl;
    private int memberHighPitch;
    private List<Tag> memberTagList;
}
