package com.singsong.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate // 변경된 컬럼만 업데이트(patch)
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long songId;
    int songNum;
    @Column(length = 100)
    String songTitle;
    @Column(length = 50)
    String songSinger;
    int songHighPitch;
    @Column(length = 50)
    String songGenre;
    @Column(length = 500)
    String songImageUrl;
    @Column(length = 10)
    String songTj;
    @Column(length = 10)
    String songKy;
    @Column(length = 500)
    String songTag;
    int songLikeCount;
}
