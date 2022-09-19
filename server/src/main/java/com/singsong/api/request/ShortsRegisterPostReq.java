package com.singsong.api.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ShortsRegisterPostReq {
    Long songId;
    String shortsComment;
}
