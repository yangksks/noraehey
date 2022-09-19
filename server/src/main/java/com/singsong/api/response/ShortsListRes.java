package com.singsong.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ShortsListRes {
    boolean hasMore;
    List<ShortsEntityRes> shortsList;

    public static ShortsListRes of (boolean hasMore, List<ShortsEntityRes> shortsList) {
        ShortsListRes res = ShortsListRes.builder()
                .hasMore(hasMore)
                .shortsList(shortsList)
                .build();
        return res;
    }
}
