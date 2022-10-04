package com.singsong.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberInfoRes {
    private String memberNickname;
    private String memberProfileUrl;
    private int memberHighPitch;
}
