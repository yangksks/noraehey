package com.singsong.api.service;

import com.singsong.api.response.ShortsEntityRes;
import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.common.exception.shorts.ShortsLikeDuplicatedException;
import com.singsong.common.exception.shorts.ShortsLikeNotFoundExcepion;
import com.singsong.common.exception.shorts.ShortsNotFoundException;
import com.singsong.common.exception.song.SongNotFoundException;
import com.singsong.common.util.S3Util;
import com.singsong.db.entity.Member;
import com.singsong.db.entity.Shorts;
import com.singsong.db.entity.ShortsLike;
import com.singsong.db.entity.Song;
import com.singsong.db.repository.MemberRepository;
import com.singsong.db.repository.ShortsLikeRepository;
import com.singsong.db.repository.ShortsRepository;
import com.singsong.db.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShortsServiceImpl implements ShortsService {

    static final int SIZE = 20;
    @Autowired
    ShortsRepository shortsRepository;
    @Autowired
    ShortsLikeRepository shortsLikeRepository;
    @Autowired
    SongRepository songRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    S3Util s3Util;

    public void saveShorts(Song song, Member member, String shortsComment, MultipartFile shortsAudioFile) throws IOException {
        // 쇼츠 등록 (id 값 가져오기 위해 먼저 등록)
        Shorts shorts = Shorts.builder()
                .song(song)
                .member(member)
                .shortsComment(shortsComment)
                .build();
        Shorts saveShorts = shortsRepository.save(shorts);
        // 오디오 파일이 있다면 이미지 S3서버에 저장 후 업데이트 해주기
        if (!shortsAudioFile.isEmpty()) {
            String shortsAudioUrl = s3Util.uploadShortsAudioFile(shortsAudioFile, saveShorts.getShortsId());
            saveShorts.setShortsAudioUrl(shortsAudioUrl);
            shortsRepository.save(saveShorts);
        }
    }

    @Override
    @Transactional
    public void deleteShorts(Long shortsId, Member member) {
        // 1. 쇼츠 찾기
        Shorts shorts = shortsRepository.findByShortsIdAndAndMemberMemberId(shortsId, member.getMemberId()).orElseThrow(() -> new ShortsNotFoundException("shorts not found", ErrorCode.SHORTS_NOT_FOUND));
        // 2. 쇼츠 삭제
        shortsRepository.deleteByShortsId(shorts.getShortsId());
    }

    @Override
    public List<Shorts> getShortsListBySongId(Long songId, int page) {
        Pageable pageable = PageRequest.of(page, SIZE, Sort.by("shortsCreateTime").descending());
        List<Shorts> shortsList = shortsRepository.findAllBySongSongId(songId, pageable);
        return shortsList;
    }

    @Override
    public List<Shorts> getShortsListByMemberId(Long memberId, int page) {
        Pageable pageable = PageRequest.of(page, SIZE, Sort.by("shortsCreateTime").descending());
        List<Shorts> shortsList = shortsRepository.findAllByMemberMemberId(memberId, pageable);
        return shortsList;
    }

    public List<ShortsEntityRes> createShortsListBySong(List<Shorts> shortsList, Song song, Member member) {
        List<ShortsEntityRes> resList = new ArrayList<>();
        for (Shorts shorts: shortsList) {
            boolean isLiked = shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shorts.getShortsId(), member.getMemberId()) != null;
            int likeCount = shortsLikeRepository.countByShortsShortsId(shorts.getShortsId()).intValue();
            Member shortsMember = memberRepository.findByMemberId(shorts.getMember().getMemberId()).orElseThrow(() -> new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND));
            ShortsEntityRes shortsEntityRes = ShortsEntityRes.builder()
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

        resList.add(shortsEntityRes);
        }
        return resList;
    }

    @Override
    public List<ShortsEntityRes> createShortsListByMember(List<Shorts> shortsList, Member loginMember, Member shortsMember) {
        List<ShortsEntityRes> resList = new ArrayList<>();
        for (Shorts shorts: shortsList) {
            Song song = songRepository.findSongBySongId(shorts.getSong().getSongId()).orElseThrow(() -> new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND));
            boolean isLiked = shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shorts.getShortsId(), loginMember.getMemberId()) != null;
            int likeCount = shortsLikeRepository.countByShortsShortsId(shorts.getShortsId()).intValue();
            ShortsEntityRes shortsEntityRes = ShortsEntityRes.builder()
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

            resList.add(shortsEntityRes);
        }

        return resList;
    }

    @Override
    public List<ShortsEntityRes> createShortsListByRandom(Member member) {
        List<Shorts> shortsList = shortsRepository.findByRandom();
        List<ShortsEntityRes> resList = new ArrayList<>();
        for (Shorts shorts: shortsList) {
            Song song = songRepository.findSongBySongId(shorts.getSong().getSongId()).orElseThrow(() -> new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND));;
            boolean isLiked = shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shorts.getShortsId(), member.getMemberId()) != null;
            int likeCount = shortsLikeRepository.countByShortsShortsId(shorts.getShortsId()).intValue();
            Member shortsMember = memberRepository.findByMemberId(shorts.getMember().getMemberId()).orElseThrow(() -> new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND));
            ShortsEntityRes shortsEntityRes = ShortsEntityRes.builder()
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

            resList.add(shortsEntityRes);
        }
        return resList;
    }

    @Override
    public ShortsEntityRes getShortsDetailByShortsId(Long shortsId, Member member) {
        Shorts shorts = shortsRepository.findByShortsId(shortsId).orElseThrow(() -> new ShortsNotFoundException("shorts not found", ErrorCode.SHORTS_NOT_FOUND));
        Song song = songRepository.findSongBySongId(shorts.getSong().getSongId()).orElseThrow(() -> new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND));;
        boolean isLiked = shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shorts.getShortsId(), member.getMemberId()) != null;
        int likeCount = shortsLikeRepository.countByShortsShortsId(shorts.getShortsId()).intValue();
        Member shortsMember = memberRepository.findByMemberId(shorts.getMember().getMemberId()).orElseThrow(() -> new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND));
        ShortsEntityRes shortsEntityRes = ShortsEntityRes.builder()
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

        return shortsEntityRes;
    }

    @Override
    public int countShortsLike(Long shortsId) {
        return shortsLikeRepository.countByShortsShortsId(shortsId).intValue();
    }

    @Override
    public void addShortsLike(Member member, Long shortsId) {
        Shorts shorts = shortsRepository.findByShortsId(shortsId).orElseThrow(() -> new ShortsNotFoundException("shorts not found", ErrorCode.SHORTS_NOT_FOUND));
        // 이미 좋아요를 한 쇼츠
        if (shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shortsId, member.getMemberId()) != null) {
            throw new ShortsLikeDuplicatedException("shorts like duplicated", ErrorCode.SHORTS_LIKE_DUPLICATION);
        }

        ShortsLike shortsLike = ShortsLike.builder()
                .shorts(shorts)
                .member(member)
                .build();
        shortsLikeRepository.save(shortsLike);
    }

    @Override
    @Transactional // delete 필수
    public void deleteShortsLike(Member member, Long shortsId) {
        shortsRepository.findByShortsId(shortsId).orElseThrow(() -> new ShortsNotFoundException("shorts not found", ErrorCode.SHORTS_NOT_FOUND));
        // 좋아요 하지 않은 쇼츠를 삭제한다면
        if (shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shortsId, member.getMemberId()) == null) {
            throw new ShortsLikeNotFoundExcepion("shorts like not found", ErrorCode.SHORTS_LIKE_NOT_FOUND);
        }

        shortsLikeRepository.deleteByMemberMemberIdAndAndShortsShortsId(member.getMemberId(), shortsId);
    }

    @Override
    @Transactional
    public List<ShortsEntityRes> getLikeShortsList(Member member, int page) {
        Pageable pageable = PageRequest.of(page, SIZE);
        List<Shorts> shortsList = shortsRepository.findByLike(member.getMemberId(), pageable);
        List<ShortsEntityRes> resList = new ArrayList<>();
        for (Shorts shorts: shortsList) {
            Song song = songRepository.findSongBySongId(shorts.getSong().getSongId()).orElseThrow(() -> new SongNotFoundException("song not found", ErrorCode.SONG_NOT_FOUND));;
            boolean isLiked = shortsLikeRepository.findByShortsShortsIdAndMemberMemberId(shorts.getShortsId(), member.getMemberId()) != null;
            int likeCount = shortsLikeRepository.countByShortsShortsId(shorts.getShortsId()).intValue();
            Member shortsMember = memberRepository.findByMemberId(shorts.getMember().getMemberId()).orElseThrow(() -> new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND));
            ShortsEntityRes shortsEntityRes = ShortsEntityRes.builder()
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

            resList.add(shortsEntityRes);
        }
        return resList;
    }

}
