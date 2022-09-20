package com.singsong.api.service;

import com.singsong.db.entity.Member;
import com.singsong.db.entity.Song;
import com.singsong.db.entity.SongLevel;
import com.singsong.db.repository.SongLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongLevelServiceImpl implements SongLevelService {

    @Autowired
    SongLevelRepository songLevelRepository;

    @Override
    public SongLevel getSongLevelBySongIdAndMemberId(Long songId, Long memberId) {
        SongLevel songLevel = songLevelRepository.findBySongSongIdAndMemberMemberId(songId, memberId).orElse(null);
        return songLevel;
    }

    @Override
    public int evaluateSongLevel(Member member, Song song, int songLevel) {
        SongLevel songLevelCheck = songLevelRepository.findBySongSongIdAndMemberMemberId(song.getSongId(), member.getMemberId()).orElse(null);
        if (songLevelCheck != null) {
            songLevelRepository.save(SongLevel.builder()
                    .songLevelId(songLevelCheck.getSongLevelId())
                    .member(member)
                    .song(song)
                    .songLevel(songLevel)
                    .build());
        } else {
            songLevelRepository.save(SongLevel.builder()
                    .member(member)
                    .song(song)
                    .songLevel(songLevel)
                    .build());
        }
        int updatedSongLevel = (int) Math.round(songLevelRepository.averageSongLevel(song.getSongId()));
        return updatedSongLevel;
    }

    @Override
    public Long getSongEvalCount(Long songId) {
        return songLevelRepository.countAllBySongSongId(songId);
    }
}
