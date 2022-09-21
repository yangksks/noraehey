package com.singsong.api.service;

import com.singsong.api.request.MagazineRegisterPostReq;
import com.singsong.api.response.MagazineRes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MagazineService {

    void addMagazine(MagazineRegisterPostReq magazineRegisterPostReq, MultipartFile magazineImageFile) throws IOException;
    MagazineRes getMagazine(Long magazineId);
    void deleteMagazine(Long magazineId);
}
