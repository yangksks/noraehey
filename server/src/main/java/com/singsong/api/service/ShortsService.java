package com.singsong.api.service;

import com.singsong.api.response.ShortsBySongGetRes;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Shorts;
import com.singsong.db.entity.Song;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ShortsService {
    void saveShorts(Song song, Member member, String shortsComment, MultipartFile shortsAudioFile) throws IOException;
    List<Shorts> getShortsListBySongId(Long songId);

    List<ShortsBySongGetRes> createShortsListBySong(List<Shorts> shortsList, Song song, Member member);
}
