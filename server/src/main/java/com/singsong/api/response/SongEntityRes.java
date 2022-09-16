package com.singsong.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 노래 목록의 아이템 하나하나에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("SongEntityResponse")
public class SongEntityRes {
}
