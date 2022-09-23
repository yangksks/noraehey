package com.singsong.api.controller;

import com.singsong.api.request.ShortsRegisterPostReq;
import com.singsong.api.response.ShortsEntityRes;
import com.singsong.api.response.ShortsLikeRes;
import com.singsong.api.response.ShortsListRes;
import com.singsong.api.service.MemberService;
import com.singsong.api.service.ShortsService;
import com.singsong.api.service.SongService;
import com.singsong.common.model.response.BaseResponseBody;
import com.singsong.common.util.JwtAuthenticationUtil;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Shorts;
import com.singsong.db.entity.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/shorts")
public class ShortsController {

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;
    @Autowired
    ShortsService shortsService;
    @Autowired
    SongService songService;
    @Autowired
    MemberService memberService;

    // 노래 쇼츠 등록
    @PostMapping
    public ResponseEntity<?> registerShorts(@RequestPart("shortsInfo") ShortsRegisterPostReq shortsRegisterPostReq, @RequestPart MultipartFile shortsAudioFile, @ApiIgnore Authentication authentication) throws IOException {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        Song song = songService.getSongBySongId(shortsRegisterPostReq.getSongId());
        shortsService.saveShorts(song, member, shortsRegisterPostReq.getShortsComment(), shortsAudioFile);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    // 노래 별 쇼츠 조회
    @GetMapping("/song/{songId}")
    public ResponseEntity<?> getShortsBySong(@PathVariable("songId") Long songId, @RequestParam("page") int page, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        if (page < 0) return ResponseEntity.status(200).body(ShortsListRes.of(false, new ArrayList<>()));

        Song song = songService.getSongBySongId(songId);
        List<Shorts> shortsList = shortsService.getShortsListBySongId(songId, page);
        List<ShortsEntityRes> resList = shortsService.createShortsListBySong(shortsList, song, member);
        // 다음 page 여부 체크
        List<Shorts> hasMoreList = shortsService.getShortsListBySongId(songId, page + 1);
        boolean hasMore = hasMoreList.size() > 0 ? true : false;

        return ResponseEntity.status(200).body(ShortsListRes.of(hasMore, resList));
    }

    // 멤버 별 쇼츠 조회
    @GetMapping("/member/{memberId}")
    public ResponseEntity<?> getShortsByMember(@PathVariable("memberId") Long memberId, @RequestParam("page") int page, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        if (page < 0) return ResponseEntity.status(200).body(ShortsListRes.of(false, new ArrayList<>()));

        Member shortsMember = memberService.getMemberByMemberId(memberId);
        List<Shorts> shortsList = shortsService.getShortsListByMemberId(memberId, page);
        List<ShortsEntityRes> resList = shortsService.createShortsListByMember(shortsList, member, shortsMember);

        // 다음 page 여부 체크
        List<Shorts> hasMoreList = shortsService.getShortsListByMemberId(memberId, page + 1);
        boolean hasMore = hasMoreList.size() > 0 ? true : false;

        return ResponseEntity.status(200).body(ShortsListRes.of(hasMore, resList));
    }

    // 랜덤 쇼츠 조회
    @GetMapping("/random")
    public ResponseEntity<?> getRandomShorts(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        List<ShortsEntityRes> resList = shortsService.createShortsListByRandom(member);
        return ResponseEntity.status(200).body(resList);
    }

    // 쇼츠 상세 조회
    @GetMapping
    public ResponseEntity<?> getShortsDetail(@RequestParam("shortsId") Long shortsId, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        ShortsEntityRes shortsEntityRes = shortsService.getShortsDetailByShortsId(shortsId, member);
        return ResponseEntity.status(200).body(shortsEntityRes);
    }


    // 쇼츠 좋아요 추가
    @PostMapping("/like")
    public ResponseEntity<?> addShortsLike(@RequestParam("shortsId") Long shortsId, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        shortsService.addShortsLike(member, shortsId);
        int likeCount = shortsService.countShortsLike(shortsId);
        return ResponseEntity.status(200).body(ShortsLikeRes.of(shortsId, likeCount, true));
    }

    // 쇼츠 좋아요 삭제
    @DeleteMapping("/like")
    public ResponseEntity<?> deleteShortsLike(@RequestParam("shortsId") Long shortsId, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        shortsService.deleteShortsLike(member, shortsId);
        int likeCount = shortsService.countShortsLike(shortsId);
        return ResponseEntity.status(200).body(ShortsLikeRes.of(shortsId, likeCount, false));
    }

    // 좋아요 쇼츠 조회
    @GetMapping("/like")
    public ResponseEntity<?> getLikeShorts(@RequestParam("page") int page, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        if (page < 0) return ResponseEntity.status(200).body(ShortsListRes.of(false, new ArrayList<>()));
        
        List<ShortsEntityRes> resList = shortsService.getLikeShortsList(member, page);
        // 다음 page 여부 체크
        List<ShortsEntityRes> hasMoreList = shortsService.getLikeShortsList(member, page + 1);
        boolean hasMore = hasMoreList.size() > 0 ? true : false;

        return ResponseEntity.status(200).body(ShortsListRes.of(hasMore, resList));

    }
}
