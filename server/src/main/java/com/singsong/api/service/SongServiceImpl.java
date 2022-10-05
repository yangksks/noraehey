package com.singsong.api.service;

import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.song.SongNotFoundException;
import com.singsong.db.entity.Song;
import com.singsong.db.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongServiceImpl implements SongService {

    @Autowired
    SongRepository songRepository;

    @Override
    public List<Song> searchSongListByTitle(String word) {
        List<Song> songList = songRepository.findAllBySongTitleOrderBySongLikeCountDesc(word);
        songList.addAll(songRepository.findAllBySongTitleContainsAndSongTitleNotOrderBySongLikeCountDesc(word, word));
        return songList;
    }

    @Override
    public List<Song> searchSongListBySinger(String word) {
        List<Song> songList = songRepository.findAllBySongSingerOrderBySongLikeCountDesc(word);
        songList.addAll(songRepository.findAllBySongSingerContainsAndSongSingerNotOrderBySongLikeCountDesc(word, word));
        return songList;
    }

    @Override
    public Song getSongBySongId(Long songId) {
        Song song = songRepository.findSongBySongId(songId).orElseThrow(() -> new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND));
        if (song == null) {
            throw new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND);
        }
        return song;
    }

    @Override
    public void updateSongLevel(Long songId, int updatedSongLevel, Long songEvalCount) {
        Song song = songRepository.findSongBySongId(songId).orElseThrow(() -> new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND));
        ;
        songRepository.save(Song.builder()
                .songId(songId)
                .songTitle(song.getSongTitle())
                .songSinger(song.getSongSinger())
                .songGenre(song.getSongGenre())
                .songTag(song.getSongTag())
                .songNum(song.getSongNum())
                .songHighPitch(song.getSongHighPitch())
                .songImageUrl(song.getSongImageUrl())
                .songAlbum(song.getSongAlbum())
                .songKy(song.getSongKy())
                .songTj(song.getSongTj())
                .songLikeCount(song.getSongLikeCount())
                .songEvalCount(songEvalCount)
                .songLevel(updatedSongLevel)
                .songLyrics(song.getSongLyrics())
                .build());
    }

    @Override
    public void updateSongLike(Long songId, int result) {
        Song song = songRepository.findSongBySongId(songId).orElseThrow(() -> new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND));
        ;
        songRepository.save(Song.builder()
                .songId(songId)
                .songTitle(song.getSongTitle())
                .songSinger(song.getSongSinger())
                .songGenre(song.getSongGenre())
                .songTag(song.getSongTag())
                .songNum(song.getSongNum())
                .songHighPitch(song.getSongHighPitch())
                .songImageUrl(song.getSongImageUrl())
                .songKy(song.getSongKy())
                .songTj(song.getSongTj())
                .songLikeCount(song.getSongLikeCount() + result)
                .songEvalCount(song.getSongEvalCount())
                .songLevel(song.getSongLevel())
                .songLyrics(song.getSongLyrics())
                .build());
    }
}
