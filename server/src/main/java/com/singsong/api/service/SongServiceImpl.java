package com.singsong.api.service;

import com.singsong.db.entity.Song;
import com.singsong.db.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongServiceImpl implements SongService {

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
    public boolean isValid(String word, int page) {
        List<Song> songList = songRepository.findAllBySongTitleOrderBySongLikeCountDesc(word);
        songList.addAll(songRepository.findAllBySongTitleContainsAndSongTitleNotOrderBySongLikeCountDesc(word, word));
        int lastIndex = (page + 1) * 20 - 1;
        if(songList.size() < (page+1) * 20 ){
            lastIndex = songList.size() - 1;
        }
        return false;
    }
}
