package com.singsong.api.response;

import com.singsong.db.entity.Song;
import com.singsong.db.entity.SongLevel;
import com.singsong.db.entity.SongLike;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 노래 상세 조회 api ([GET] /api/song/info/{songId}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("SongDetailResponse")
public class SongDetailRes {
    String songTitle;
    String songSinger;
    int songHighPitch;
    String songGenre;
    String songImageUrl;
    String songTj;
    String songKy;
    int songLikeCount;
    boolean isLiked;
    int songLevel;
    int songEvalCount;
    int myEval;
    String songLyrics;

    public static SongDetailRes of(Song song, SongLike songLike, SongLevel songLevel) {
        SongDetailRes res = SongDetailRes.builder()
                .songTitle(song.getSongTitle())
                .songSinger(song.getSongSinger())
                .songHighPitch(song.getSongHighPitch())
                .songGenre(song.getSongGenre())
                .songImageUrl(song.getSongImageUrl())
                .songTj(song.getSongTj())
                .songKy(song.getSongKy())
                .songLikeCount(song.getSongLikeCount())
                .isLiked(songLike == null ? false : true)
                .songLevel(song.getSongLevel())
                .songEvalCount(song.getSongEvalCount())
                .myEval(songLevel == null ? 0 : songLevel.getSongLevel())
                .songLyrics(song.getSongLyrics())
                .build();
        return res;
    }

}
