package com.singsong.api.controller;

import com.singsong.api.response.SongListRes;
import com.singsong.api.service.SongService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "노래 API", tags = {"Song"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/song")
public class SongController {

    @Autowired
    SongService songService;

    @GetMapping("/search")
    public ResponseEntity<SongListRes> searchSongList(@RequestParam("word") String word, @RequestParam("page") int page){
        return ResponseEntity.status(200).body(SongListRes.of(hasMore, SongEntityResList));
    }

}
