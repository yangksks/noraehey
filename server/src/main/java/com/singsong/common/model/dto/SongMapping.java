package com.singsong.common.model.dto;

import com.singsong.api.response.SongEntityRes;

public interface SongMapping {
    Long getSongId();
    String getSongTitle();
    String getSongSinger();
    String getSongImageUrl();
    Integer getSongHighPitch();
}
