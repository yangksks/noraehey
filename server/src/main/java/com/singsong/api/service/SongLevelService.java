package com.singsong.api.service;

import com.singsong.db.entity.SongLevel;

public interface SongLevelService {
    SongLevel getSongLevelBySongIdAndMemberId(Long songId, Long memberId);
}
