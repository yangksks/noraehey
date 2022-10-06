package com.singsong.api.service;

import com.singsong.common.model.response.KakaoMemberInfo;

import java.io.IOException;
import java.net.MalformedURLException;

public interface KakaoService {

    String getKakaoAccessToken(String code) throws IOException;
    String getKakaoAccessToken2(String code) throws IOException;

    KakaoMemberInfo getKakaoEmailAndKakaoId(String accessToken) throws IOException;
}
