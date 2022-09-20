package com.singsong.api.service;

import com.singsong.db.entity.Member;
import com.singsong.db.entity.Song;
import com.singsong.db.entity.SongLike;

public interface SongLikeService {
    SongLike getSongLikeBySongIdAndMemberId(Long songId, Long memberId);
    int registerSongLike(Member member, Song song);
    int deleteSongLike(Member member, Song song);
}
