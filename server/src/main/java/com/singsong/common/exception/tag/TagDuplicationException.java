package com.singsong.common.exception.tag;

import com.singsong.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class TagDuplicationException extends RuntimeException{
    private ErrorCode errorCode;

    public TagDuplicationException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
