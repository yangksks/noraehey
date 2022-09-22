package com.singsong.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class PyRecommendPostReq {
    Long memberId;
    int memberHighPitch;
    List<String> tagNameList;
}
