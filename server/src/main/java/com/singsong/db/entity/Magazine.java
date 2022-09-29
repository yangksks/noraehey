package com.singsong.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate // 변경된 컬럼만 업데이트(patch)
public class Magazine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long magazineId;
    @Column(length = 100)
    String magazineTitle;
    @Column(length = 1000)
    String magazineContent;
    @Column(length = 500)
    String magazineImageUrl;

    public void setMagazineImageUrl(String magazineImageUrl) {
        this.magazineImageUrl = magazineImageUrl;
    }
}
