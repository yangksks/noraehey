package com.singsong.api.request;

import lombok.Getter;

import java.util.List;

@Getter
public class TagPostReq {
    List<Long> tagIdList;
}
