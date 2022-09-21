package com.singsong.api.request;

import lombok.Getter;

@Getter
public class SongLevelPostReq {
    Long songId;
    int songLevel;
}
