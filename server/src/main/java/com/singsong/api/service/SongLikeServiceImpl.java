package com.singsong.api.service;

import com.singsong.db.entity.SongLike;
import com.singsong.db.repository.SongLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongLikeServiceImpl implements SongLikeService{

    @Autowired
    SongLikeRepository songLikeRepository;

    @Override
    public SongLike getSongLikeBySongIdAndMemberId(Long songId, Long memberId) {
        SongLike songLike = songLikeRepository.findBySongSongIdAndMemberMemberId(songId, memberId).orElse(null);
        return songLike;
    }
}
