package com.singsong.api.service;

import com.singsong.db.entity.Song;

public interface SongService {
    Song getSongBySongId(Long songId);
}
