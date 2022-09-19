package com.singsong.api.response;

import com.singsong.db.entity.Song;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 노래 목록의 아이템 하나하나에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("SongEntityResponse")
public class SongEntityRes {
    Long songId;
    String songTitle;
    String songSinger;
    String songImageUrl;
    int songHighPitch;

    public static SongEntityRes of(Song song){
        SongEntityRes res = SongEntityRes.builder()
                .songId(song.getSongId())
                .songTitle(song.getSongTitle())
                .songSinger(song.getSongSinger())
                .songImageUrl(song.getSongImageUrl())
                .songHighPitch(song.getSongHighPitch())
                .build();
        return res;
    }
}
