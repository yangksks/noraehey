package com.singsong.api.service;

import com.singsong.db.entity.SongLevel;
import com.singsong.db.repository.SongLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongLevelServiceImpl implements SongLevelService{

    @Autowired
    SongLevelRepository songLevelRepository;

    @Override
    public SongLevel getSongLevelBySongIdAndMemberId(Long songId, Long memberId) {
        SongLevel songLevel = songLevelRepository.findBySongSongIdAndMemberMemberId(songId, memberId).orElse(null);
        return songLevel;
    }
}
