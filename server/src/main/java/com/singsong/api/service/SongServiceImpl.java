package com.singsong.api.service;

import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.song.SongNotFoundException;
import com.singsong.db.entity.Song;
import com.singsong.db.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongServiceImpl implements SongService{

    @Autowired
    SongRepository songRepository;

    @Override
    public Song getSongBySongId(Long songId) {
        Song song = songRepository.findSongBySongId(songId);
        if (song == null) {
            throw new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND);
        }
        return song;
    }
}
