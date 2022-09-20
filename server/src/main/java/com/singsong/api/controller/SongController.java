package com.singsong.api.controller;

import com.singsong.api.request.SongLevelPostReq;
import com.singsong.api.response.SongDetailRes;
import com.singsong.api.response.SongEntityRes;
import com.singsong.api.response.SongListRes;
import com.singsong.api.service.SongLevelService;
import com.singsong.api.service.SongLikeService;
import com.singsong.api.service.SongService;
import com.singsong.common.model.response.BaseResponseBody;
import com.singsong.common.util.JwtAuthenticationUtil;
import com.singsong.common.util.auth.MemberDetails;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Song;
import com.singsong.db.entity.SongLevel;
import com.singsong.db.entity.SongLike;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(value = "노래 API", tags = {"Song"})
@RestController
@RequestMapping("/song")
public class SongController {

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

    @Autowired
    SongService songService;

    @Autowired
    SongLikeService songLikeService;

    @Autowired
    SongLevelService songLevelService;

    @GetMapping("/search")
    public ResponseEntity<SongListRes> searchSongList(@RequestParam("word") String word, @RequestParam("page") int page){
        int pageSize = 20;
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

    @GetMapping("/info/{songId}")
    public ResponseEntity<SongDetailRes> getSongDetail(@PathVariable("songId") Long songId, @ApiIgnore Authentication authentication){
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Long memberId = member.getMemberId();
        Song song = songService.getSongBySongId(songId);
        SongLike songLike = songLikeService.getSongLikeBySongIdAndMemberId(songId, memberId);
        SongLevel songLevel = songLevelService.getSongLevelBySongIdAndMemberId(songId, memberId);
        return ResponseEntity.status(200).body(SongDetailRes.of(song, songLike, songLevel));
    }

    @PostMapping("/level")
    public ResponseEntity<? extends BaseResponseBody> evaluateSongLevel(@RequestBody SongLevelPostReq songLevelPostReq, @ApiIgnore Authentication authentication){
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Song song = songService.getSongBySongId(songLevelPostReq.getSongId());
        int updatedSongLevel = songLevelService.evaluateSongLevel(member, song, songLevelPostReq.getSongLevel());
        Long songEvalCount = songLevelService.getSongEvalCount(song.getSongId());
        songService.updateSongLevel(song.getSongId(), updatedSongLevel, songEvalCount);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PostMapping("/like")
    public ResponseEntity<? extends BaseResponseBody> registerSongLike(@RequestBody Map<String, Long> songLikeMap, @ApiIgnore Authentication authentication){
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Song song = songService.getSongBySongId(songLikeMap.get("songId"));
        int result = songLikeService.registerSongLike(member, song);
        songService.updateSongLike(songLikeMap.get("songId"), result);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @DeleteMapping("/like")
    public ResponseEntity<? extends BaseResponseBody> deleteSongLike(@RequestBody Map<String, Long> songLikeMap, @ApiIgnore Authentication authentication){
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Song song = songService.getSongBySongId(songLikeMap.get("songId"));
        int result = songLikeService.deleteSongLike(member, song);
        songService.updateSongLike(songLikeMap.get("songId"), result);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/like")
    public ResponseEntity<SongListRes> getSongLikeList(@RequestParam("page") int page, @ApiIgnore Authentication authentication){
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        int pageSize = 20;
        Pageable pageable = PageRequest.of(page, pageSize);
        boolean hasMore = false;
        List<SongEntityRes> songEntityResList = new ArrayList<>();
        List<Song> songLikeList = songLikeService.getSongLikeListByMemberId(member.getMemberId(), pageable);
        List<Song> hasMoreList = songLikeService.getSongLikeListByMemberId(member.getMemberId(), PageRequest.of(page + 1, pageSize));
        if (hasMoreList.size() != 0) hasMore = true;
        for(Song song : songLikeList){
            SongEntityRes songEntityRes = SongEntityRes.of(song);
            songEntityResList.add(songEntityRes);
        }
        return ResponseEntity.status(200).body(SongListRes.of(hasMore, songEntityResList));
    }
}
