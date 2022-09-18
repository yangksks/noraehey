package com.singsong.api.service;

import com.singsong.api.response.ShortsBySongGetRes;
import com.singsong.common.util.S3Util;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Shorts;
import com.singsong.db.entity.ShortsLike;
import com.singsong.db.entity.Song;
import com.singsong.db.repository.ShortsLikeRepository;
import com.singsong.db.repository.ShortsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShortsServiceImpl implements ShortsService {

    @Autowired
    ShortsRepository shortsRepository;
    @Autowired
    ShortsLikeRepository shortsLikeRepository;
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

    @Override
    public List<Shorts> getShortsListBySongId(Long songId) {
        List<Shorts> shortsList = shortsRepository.findAllBySongSongId(songId);
        return shortsList;
    }

    public List<ShortsBySongGetRes> createShortsListBySong(List<Shorts> shortsList, Song song, Member member) {
        List<ShortsBySongGetRes> resList = new ArrayList<>();
        for (Shorts shorts: shortsList) {
            boolean isLiked = shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shorts.getShortsId(), member.getMemberId()) == null ? false : true;
            int likeCount = shortsLikeRepository.countByShortsShortsId(shorts.getShortsId()).intValue();
            ShortsBySongGetRes shortsBySongGetRes = ShortsBySongGetRes.builder()
                    .shortsId(shorts.getShortsId())
                    .shortsComment(shorts.getShortsComment())
                    .shortsAudioUrl(shorts.getShortsAudioUrl())
                    .shortsCreateTime(shorts.getShortsCreateTime())
                    .songId(song.getSongId())
                    .songTitle(song.getSongTitle())
                    .songSinger(song.getSongSinger())
                    .songHighPitch(song.getSongHighPitch())
                    .songImageUrl(song.getSongImageUrl())
                    .songTj(song.getSongTj())
                    .songKy(song.getSongKy())
                    .memberId(member.getMemberId())
                    .memberNickname(member.getMemberNickname())
                    .memberProfileUrl(member.getMemberProfileUrl())
                    .likeCount(likeCount)
                    .isLiked(isLiked)
                    .build();

        resList.add(shortsBySongGetRes);
        }
        return resList;
    }
}
