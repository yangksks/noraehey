package com.singsong.api.service;

import com.singsong.api.response.ShortsEntityRes;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Shorts;
import com.singsong.db.entity.Song;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ShortsService {
    void saveShorts(Song song, Member member, String shortsComment, MultipartFile shortsAudioFile) throws IOException;
    List<Shorts> getShortsListBySongId(Long songId, int page);
    List<Shorts> getShortsListByMemberId(Long memberId, int page);
    List<ShortsEntityRes> createShortsListBySong(List<Shorts> shortsList, Song song, Member member);
    List<ShortsEntityRes> createShortsListByMember(List<Shorts> shortsList, Member loginMember, Member shortsMember);
    List<ShortsEntityRes> createShortsListByRandom(Member member);
}
