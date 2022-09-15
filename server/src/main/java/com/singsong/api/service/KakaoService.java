package com.singsong.api.service;

import com.singsong.common.model.response.KakaoMemberInfo;

import java.io.IOException;
import java.net.MalformedURLException;

public interface KakaoService {

    String getKakaoAccessToken(String code);

    KakaoMemberInfo getKakaoEmailAndKakaoId(String accessToken) throws IOException;
}
