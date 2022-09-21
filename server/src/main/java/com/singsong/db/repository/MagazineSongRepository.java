package com.singsong.db.repository;

import com.singsong.api.response.SongEntityRes;
import com.singsong.common.model.dto.SongMapping;
import com.singsong.db.entity.MagazineSong;
import com.singsong.db.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MagazineSongRepository extends JpaRepository<MagazineSong, Long> {
//    @Query(value = "select s.song_id, s.song_title, s.song_singer, s.song_image_url, s.song_high_pitch,  from magazine_song m\n" +
//            "join song s\n" +
//            "on m.song_id = s.song_id\n" +
//            "where m.magazine_id = :magazineId", nativeQuery = true)
    @Query(value = "select s.song_id songId, s.song_title songTitle, s.song_singer songSinger, s.song_image_url songImageUrl, s.song_high_pitch songHighPitch from magazine_song as m\n" +
            "join song as s\n" +
            "on m.song_id = s.song_id\n" +
            "where m.magazine_id = :magazineId", nativeQuery = true)
    List<SongMapping> findSongListByMagazineId(Long magazineId);
}
