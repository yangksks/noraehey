package com.singsong.api.request;

import lombok.Getter;

import java.util.List;

@Getter
public class RecommendPostReq {
    List<Long> tagIdList;
}
