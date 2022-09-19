package com.singsong.api.service;

import com.singsong.api.response.ShortsEntityRes;
import com.singsong.common.util.S3Util;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Shorts;
import com.singsong.db.entity.Song;
import com.singsong.db.repository.ShortsLikeRepository;
import com.singsong.db.repository.ShortsRepository;
import com.singsong.db.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    SongRepository songRepository;
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
    public List<Shorts> getShortsListBySongId(Long songId, int page) {
        Pageable pageable = PageRequest.of(page, 2, Sort.by("shortsCreateTime").descending());
        List<Shorts> shortsList = shortsRepository.findAllBySongSongId(songId, pageable);
        return shortsList;
    }

    @Override
    public List<Shorts> getShortsListByMemberId(Long memberId, int page) {
        Pageable pageable = PageRequest.of(page, 2, Sort.by("shortsCreateTime").descending());
        List<Shorts> shortsList = shortsRepository.findAllByMemberMemberId(memberId, pageable);
        return shortsList;
    }

    public List<ShortsEntityRes> createShortsListBySong(List<Shorts> shortsList, Song song, Member member) {
        List<ShortsEntityRes> resList = new ArrayList<>();
        for (Shorts shorts: shortsList) {
            boolean isLiked = shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shorts.getShortsId(), member.getMemberId()) == null ? false : true;
            int likeCount = shortsLikeRepository.countByShortsShortsId(shorts.getShortsId()).intValue();
            ShortsEntityRes shortsGetRes = ShortsEntityRes.builder()
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

        resList.add(shortsGetRes);
        }
        return resList;
    }

    @Override
    public List<ShortsEntityRes> createShortsListByMember(List<Shorts> shortsList, Member loginMember, Member shortsMember) {
        List<ShortsEntityRes> resList = new ArrayList<>();
        for (Shorts shorts: shortsList) {
            Song song = songRepository.findSongBySongId(shorts.getSong().getSongId());
            boolean isLiked = shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shorts.getShortsId(), loginMember.getMemberId()) == null ? false : true;
            int likeCount = shortsLikeRepository.countByShortsShortsId(shorts.getShortsId()).intValue();
            ShortsEntityRes shortsGetRes = ShortsEntityRes.builder()
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
                    .memberId(shortsMember.getMemberId())
                    .memberNickname(shortsMember.getMemberNickname())
                    .memberProfileUrl(shortsMember.getMemberProfileUrl())
                    .likeCount(likeCount)
                    .isLiked(isLiked)
                    .build();

            resList.add(shortsGetRes);
        }

        return resList;
    }

}
