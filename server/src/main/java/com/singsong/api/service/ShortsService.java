package com.singsong.api.service;

import com.singsong.db.entity.Member;
import com.singsong.db.entity.Song;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ShortsService {
    void saveShorts(Song song, Member member, String shortsComment, MultipartFile shortsAudioFile) throws IOException;
}
