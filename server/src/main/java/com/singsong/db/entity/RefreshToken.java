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
public class RefreshToken {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long refreshTokenId;
    @Column(length = 500)
    String refreshToken;
}
