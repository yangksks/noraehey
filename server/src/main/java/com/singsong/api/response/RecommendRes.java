package com.singsong.api.response;

import com.singsong.db.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendRes {
    List<SongEntityRes> lowList;
    List<SongEntityRes> fitList;
    List<SongEntityRes> highList;

    public static RecommendRes of(List<SongEntityRes> lowList, List<SongEntityRes> fitList, List<SongEntityRes> highList){
        RecommendRes res = RecommendRes.builder()
                .lowList(lowList)
                .fitList(fitList)
                .highList(highList)
                .build();
        return res;
    }
}
