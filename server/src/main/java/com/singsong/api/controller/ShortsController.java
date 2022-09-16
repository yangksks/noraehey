package com.singsong.api.controller;

import com.singsong.api.request.ShortsRegisterPostReq;
import com.singsong.api.response.ShortsBySongGetRes;
import com.singsong.api.service.MemberService;
import com.singsong.api.service.ShortsService;
import com.singsong.api.service.SongService;
import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.common.exception.member.MemberUnauthorizedException;
import com.singsong.common.model.response.BaseResponseBody;
import com.singsong.common.util.auth.MemberDetails;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Shorts;
import com.singsong.db.entity.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/shorts")
public class ShortsController {

    @Autowired
    ShortsService shortsService;
    @Autowired
    SongService songService;
    @Autowired
    MemberService memberService;

    // 노래 쇼츠 등록
    @PostMapping
    public ResponseEntity<?> registerShorts(@RequestPart("shortsInfo") ShortsRegisterPostReq shortsRegisterPostReq, @RequestPart MultipartFile shortsAudioFile, @ApiIgnore Authentication authentication) throws IOException {
        if (authentication == null) throw new MemberUnauthorizedException("member unauthorized", ErrorCode.Member_Unauthorized);
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        if (memberDetails == null) throw new MemberUnauthorizedException("member unauthorized", ErrorCode.Member_Unauthorized);
        String email = memberDetails.getUsername();
        Member member = memberService.getMemberByMemberEmail(email);
        if (member == null) throw new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND);

        Song song = songService.getSongBySongId(shortsRegisterPostReq.getSongId());
        shortsService.saveShorts(song, member, shortsRegisterPostReq.getShortsComment(), shortsAudioFile);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/song/{songId}")
    public ResponseEntity<?> getShortsBySong(@PathVariable("songId") Long songId, @ApiIgnore Authentication authentication) {
        if (authentication == null) throw new MemberUnauthorizedException("member unauthorized", ErrorCode.Member_Unauthorized);
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        if (memberDetails == null) throw new MemberUnauthorizedException("member unauthorized", ErrorCode.Member_Unauthorized);
        String email = memberDetails.getUsername();
        Member member = memberService.getMemberByMemberEmail(email);
        if (member == null) throw new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND);

        Song song = songService.getSongBySongId(songId);
        List<Shorts> shortsList = shortsService.getShortsListBySongId(songId);
        List<ShortsBySongGetRes> resList = shortsService.createShortsListBySong(shortsList, song, member);
        return ResponseEntity.status(200).body(resList);
    }

}
