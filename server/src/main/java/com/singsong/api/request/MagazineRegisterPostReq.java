package com.singsong.api.request;

import com.singsong.api.response.SongEntityRes;
import lombok.Getter;

import java.util.List;

@Getter
public class MagazineRegisterPostReq {
    String magazineTitle;
    String magazineContent;
    List<Long> magazineSongList;
}
