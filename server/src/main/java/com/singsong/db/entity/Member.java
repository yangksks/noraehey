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
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long memberId;
    @Column(length = 100)
    String memberEmail;
    @Column(length = 20)
    String memberNickname;
    @Column(length = 500)
    String memberProfileUrl;
    @Column(length = 500)
    String memberTag;
    int memberHighPitch;
    int memberRole;
}
