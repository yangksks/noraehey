package com.singsong.api.service;

import com.singsong.db.entity.Song;

import java.util.List;

public interface SongService {
    List<Song> searchSongListByTitle(String word);
    List<Song> searchSongListBySinger(String word);
    Song getSongBySongId(Long songId);
    void updateSongLevel(Long songId, int updatedSongLevel, Long songEvalCount);
    void updateSongLike(Long songId, int result);
}
