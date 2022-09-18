package com.singsong.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ShortsBySongGetRes {
    // shorts
    Long shortsId;
    String shortsComment;
    String shortsAudioUrl;
    LocalDateTime shortsCreateTime;

    // song
    Long songId;
    String songTitle;
    String songSinger;
    int songHighPitch;
    String songImageUrl;
    String songTj;
    String songKy;

    // member
    Long memberId;
    String memberNickname;
    String memberProfileUrl;
    int likeCount;
    boolean isLiked;
}
