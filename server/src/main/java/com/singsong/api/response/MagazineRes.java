package com.singsong.api.response;

import com.singsong.common.model.dto.SongMapping;
import com.singsong.db.entity.Magazine;
import com.singsong.db.entity.Song;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class MagazineRes {
    Long magazineId;
    String magazineTitle;
    String magazineContent;
    String magazineImageUrl;
    List<SongEntityRes> songEntityResList;

    public static MagazineRes of(Magazine magazine, List<SongMapping> songList) {
        List<SongEntityRes> songEntityResList = new ArrayList<>();
        for (SongMapping song: songList) {
            SongEntityRes songEntityRes = SongEntityRes.builder()
                    .songId(song.getSongId())
                    .songTitle(song.getSongTitle())
                    .songSinger(song.getSongSinger())
                    .songHighPitch(song.getSongHighPitch())
                    .songImageUrl(song.getSongImageUrl())
                    .build();
            songEntityResList.add(songEntityRes);
        }
        MagazineRes res = MagazineRes.builder()
                .magazineId(magazine.getMagazineId())
                .magazineTitle(magazine.getMagazineTitle())
                .magazineContent(magazine.getMagazineContent())
                .magazineImageUrl(magazine.getMagazineImageUrl())
                .songEntityResList(songEntityResList)
                .build();
        return res;
    }
}
