package com.singsong.api.service;

import com.singsong.db.entity.Member;
import com.singsong.db.entity.Song;
import com.singsong.db.entity.SongLike;
import com.singsong.db.repository.SongLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongLikeServiceImpl implements SongLikeService {

    @Autowired
    SongLikeRepository songLikeRepository;

    @Override
    public SongLike getSongLikeBySongIdAndMemberId(Long songId, Long memberId) {
        SongLike songLike = songLikeRepository.findBySongSongIdAndMemberMemberId(songId, memberId).orElse(null);
        return songLike;
    }

    @Override
    public int registerSongLike(Member member, Song song) {
        SongLike songLikeCheck = songLikeRepository.findBySongSongIdAndMemberMemberId(song.getSongId(), member.getMemberId()).orElse(null);
        if (songLikeCheck != null) {
            return 0;
        } else {
            songLikeRepository.save(SongLike.builder()
                    .member(member)
                    .song(song)
                    .build());
            return 1;
        }
    }

    @Override
    public int deleteSongLike(Member member, Song song) {
        SongLike songLikeCheck = songLikeRepository.findBySongSongIdAndMemberMemberId(song.getSongId(), member.getMemberId()).orElse(null);
        if (songLikeCheck != null) {
            songLikeRepository.delete(songLikeCheck);
            return -1;
        } else {
            return 0;
        }
    }
}
