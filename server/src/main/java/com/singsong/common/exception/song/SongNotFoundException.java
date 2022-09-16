package com.singsong.common.exception.song;

import com.singsong.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class SongNotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public SongNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
