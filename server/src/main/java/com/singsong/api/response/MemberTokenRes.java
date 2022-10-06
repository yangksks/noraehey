package com.singsong.api.response;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class MemberTokenRes {
    String accessToken;
    String refreshToken;
}
