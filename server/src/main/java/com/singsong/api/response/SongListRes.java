package com.singsong.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 노래 검색 api ([GET] /api/song/search?word=&page=) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("SongEntityResponse")
public class SongListRes {
}
