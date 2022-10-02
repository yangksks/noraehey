package com.singsong.api.controller;

import com.singsong.api.request.MagazineRegisterPostReq;
import com.singsong.api.service.MagazineService;
import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberUnauthorizedException;
import com.singsong.common.model.response.BaseResponseBody;
import com.singsong.common.util.JwtAuthenticationUtil;
import com.singsong.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/magazine")
public class MagazineController {

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;
    @Autowired
    MagazineService magazineService;

    // 매거진 등록
    @PostMapping
    public ResponseEntity<?> registerMagazine(@RequestPart("magazineInfo") MagazineRegisterPostReq magazineRegisterPostReq,
                                              @RequestPart(required = false) MultipartFile magazineImageFile, @ApiIgnore Authentication authentication) throws IOException {

        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        if (member.getMemberRole() != 2) throw new MemberUnauthorizedException("member unauthorized", ErrorCode.Member_Unauthorized);
        magazineService.addMagazine(magazineRegisterPostReq, magazineImageFile);


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));

    }

    // 매거진 조회
    @GetMapping("/{magazineId}")
    public ResponseEntity<?> getMagazine(@PathVariable("magazineId") Long magazineId) {
        return ResponseEntity.status(200).body(magazineService.getMagazine(magazineId));
    }

    // 매거진 삭제
    @DeleteMapping
    @Transactional
    public ResponseEntity<?> deleteMagazine(@RequestParam("magazineId") Long magazineId, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        if (member.getMemberRole() != 2) throw new MemberUnauthorizedException("member unauthorized", ErrorCode.Member_Unauthorized);
        magazineService.deleteMagazine(magazineId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
