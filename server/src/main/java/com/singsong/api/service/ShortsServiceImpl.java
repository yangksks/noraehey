package com.singsong.api.service;

import com.singsong.common.util.S3Util;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Shorts;
import com.singsong.db.entity.Song;
import com.singsong.db.repository.ShortsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ShortsServiceImpl implements ShortsService {

    @Autowired
    ShortsRepository shortsRepository;
    @Autowired
    S3Util s3Util;

    public void saveShorts(Song song, Member member, String shortsComment, MultipartFile shortsAudioFile) throws IOException {
        String shortsAudioUrl = s3Util.uploadShortsAudioFile(shortsAudioFile, song.getSongId());
        Shorts shorts = Shorts.builder()
                .song(song)
                .member(member)
                .shortsComment(shortsComment)
                .shortsAudioUrl(shortsAudioUrl)
                .build();
        shortsRepository.save(shorts);
    }
}
