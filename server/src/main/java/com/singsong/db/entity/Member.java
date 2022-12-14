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
    private Long memberId;
    @Column(length = 100)
    private String memberEmail;
    @Column(length = 20)
    private String memberNickname;
    @Column(length = 500)
    private String memberProfileUrl;
    int memberHighPitch;
    int memberRole;


    public void setMemberHighPitch(int highPitch) {
        this.memberHighPitch = highPitch;
    }

    public void setMemberNickname(String nickname) {
        this.memberNickname = nickname;
    }

    public void setMemberProfileUrl(String url) {
        this.memberProfileUrl = url;
    }

    public void deleteMember() {this.memberRole = 0;}
}
