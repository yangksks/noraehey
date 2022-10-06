package com.singsong.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShortsEntityRes {
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
