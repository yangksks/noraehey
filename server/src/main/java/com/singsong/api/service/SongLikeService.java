package com.singsong.api.service;

import com.singsong.db.entity.Member;
import com.singsong.db.entity.Song;
import com.singsong.db.entity.SongLike;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SongLikeService {
    SongLike getSongLikeBySongIdAndMemberId(Long songId, Long memberId);
    List<Song> getSongLikeListByMemberId(Long memberId, Pageable pageable);
    int registerSongLike(Member member, Song song);
    int deleteSongLike(Member member, Song song);
}
