package com.singsong.api.service;

import com.singsong.db.entity.Member;
import com.singsong.db.entity.Song;
import com.singsong.db.entity.SongLevel;

public interface SongLevelService {
    SongLevel getSongLevelBySongIdAndMemberId(Long songId, Long memberId);
    int evaluateSongLevel(Member member, Song song, int songLevel);
    Long getSongEvalCount(Long songId);
}
