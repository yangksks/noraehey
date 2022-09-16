package com.singsong.api.response;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class KakaoLoginPostRes {
    String accessToken;
    String refreshToken;
}
