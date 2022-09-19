package com.singsong.api.controller;

import com.singsong.api.response.SongEntityRes;
import com.singsong.api.response.SongListRes;
import com.singsong.api.service.SongService;
import com.singsong.db.entity.Song;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Api(value = "노래 API", tags = {"Song"})
@RestController
@RequestMapping("/song")
public class SongController {

    @Autowired
    SongService songService;

    @GetMapping("/search")
    public ResponseEntity<SongListRes> searchSongList(@RequestParam("word") String word, @RequestParam("page") int page){
        int pageSize = 2;
        boolean hasMore = false;
        List<SongEntityRes> songEntityResList = new ArrayList<>();
        List<Song> songList = songService.searchSongList(word);
        int fromIdx = page * pageSize;
        int toIdx = (page + 1) * pageSize - 1 >= songList.size() ? songList.size() - 1 : (page + 1) * pageSize - 1;
        if(songList.size() <= fromIdx || page < 0){
            return ResponseEntity.status(200).body(SongListRes.of(hasMore, songEntityResList));
        }
        List<Song> songListPaged = songList.subList(fromIdx, toIdx + 1);
        for(Song song : songListPaged){
            SongEntityRes songEntityRes = SongEntityRes.of(song);
            songEntityResList.add(songEntityRes);
        }
        if(songList.size() > toIdx + 1) hasMore = true;
        return ResponseEntity.status(200).body(SongListRes.of(hasMore, songEntityResList));
    }

}
