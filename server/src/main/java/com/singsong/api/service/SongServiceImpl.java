package com.singsong.api.service;

import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.song.SongNotFoundException;
import com.singsong.db.entity.Song;
import com.singsong.db.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongServiceImpl implements SongService{

    @Autowired
    SongRepository songRepository;

    @Override
    public List<Song> searchSongList(String word) {
//        Pageable pageable = PageRequest.of(page, 20, Sort.by("songLikeCount").descending());
        List<Song> songList = songRepository.findAllBySongTitleOrderBySongLikeCountDesc(word);
        songList.addAll(songRepository.findAllBySongTitleContainsAndSongTitleNotOrderBySongLikeCountDesc(word, word));
        return songList;
    }

    @Override
    public Song getSongBySongId(Long songId) {
        Song song = songRepository.findSongBySongId(songId);
        if (song == null) {
            throw new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND);
        }
        return song;
    }
}
