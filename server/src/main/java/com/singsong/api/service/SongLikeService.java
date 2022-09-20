package com.singsong.api.service;

import com.singsong.db.entity.SongLike;

public interface SongLikeService {
    SongLike getSongLikeBySongIdAndMemberId(Long songId, Long memberId);
}
