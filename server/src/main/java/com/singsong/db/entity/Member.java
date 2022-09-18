package com.singsong.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

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
    @OneToMany(mappedBy = "member")
    @JsonManagedReference // 순환참조 문제해결
    private List<MemberTag> memberTag;

    int memberHighPitch;
    int memberRole;
}
