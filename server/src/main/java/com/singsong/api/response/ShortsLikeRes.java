package com.singsong.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShortsLikeRes {
    Long shortsId;
    int likeCount;
    boolean isLiked;

    public static ShortsLikeRes of(Long shortsId, int likeCount, boolean isLiked) {
        ShortsLikeRes res = ShortsLikeRes.builder()
                .shortsId(shortsId)
                .likeCount(likeCount)
                .isLiked(isLiked)
                .build();
        return res;
    }
}
