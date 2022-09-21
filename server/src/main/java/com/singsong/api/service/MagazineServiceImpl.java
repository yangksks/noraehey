package com.singsong.api.service;

import com.singsong.api.request.MagazineRegisterPostReq;
import com.singsong.api.response.MagazineRes;
import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.magazine.MagazineNotFoundException;
import com.singsong.common.exception.song.SongNotFoundException;
import com.singsong.common.model.dto.SongMapping;
import com.singsong.common.util.S3Util;
import com.singsong.db.entity.Magazine;
import com.singsong.db.entity.MagazineSong;
import com.singsong.db.entity.Song;
import com.singsong.db.repository.MagazineRepository;
import com.singsong.db.repository.MagazineSongRepository;
import com.singsong.db.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public class MagazineServiceImpl implements MagazineService{

    @Autowired
    S3Util s3Util;
    @Autowired
    MagazineRepository magazineRepository;
    @Autowired
    MagazineSongRepository magazineSongRepository;
    @Autowired
    SongRepository songRepository;

    @Override
    @Transactional
    public void addMagazine(MagazineRegisterPostReq magazineRegisterPostReq, MultipartFile magazineImageFile) throws IOException {
        // 매거진 등록 (id 값 가져오기 위해 먼저 등록)
        Magazine magazine = Magazine.builder()
                .magazineTitle(magazineRegisterPostReq.getMagazineTitle())
                .magazineContent(magazineRegisterPostReq.getMagazineContent())
                .build();
        Magazine saveMagazine = magazineRepository.save(magazine);
        // 이미지가 있다면 이미지 S3서버에 저장 후 업데이트 해주기
        if (!magazineImageFile.isEmpty()) {
            String magazineImageUrl = s3Util.uploadMagazineImageFile(magazineImageFile, saveMagazine.getMagazineId());
            // 매거진 image url 업데이트
            saveMagazine.setMagazineImageUrl(magazineImageUrl);
            magazineRepository.save(saveMagazine);
        }
        // 매거진 송 등록
        for (Long songId: magazineRegisterPostReq.getMagazineSongList()) {
            Song song = songRepository.findSongBySongId(songId).orElseThrow(() -> new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND));
            MagazineSong magazineSong = MagazineSong.builder()
                    .magazine(saveMagazine)
                    .song(song)
                    .build();
            magazineSongRepository.save(magazineSong);
        }
    }

    @Override
    public MagazineRes getMagazine(Long magazineId) {
        Magazine magazine = magazineRepository.findByMagazineId(magazineId).orElseThrow(() -> new MagazineNotFoundException("magazine not found", ErrorCode.MAGAZINE_NOT_FOUND));
        List<SongMapping> songList = magazineSongRepository.findSongListByMagazineId(magazineId);
        return MagazineRes.of(magazine, songList);
    }

    @Override
    @Transactional
    public void deleteMagazine(Long magazineId) {
        Magazine magazine = magazineRepository.findByMagazineId(magazineId).orElseThrow(() -> new MagazineNotFoundException("magazine not found", ErrorCode.MAGAZINE_NOT_FOUND));
        magazineRepository.deleteByMagazineId(magazineId);
        String magazineImageUrl = magazine.getMagazineImageUrl();
        if (magazineImageUrl != null) s3Util.deleteFile(magazineImageUrl.substring(49));
    }
}
