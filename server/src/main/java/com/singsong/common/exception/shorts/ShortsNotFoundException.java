package com.singsong.common.exception.shorts;

import com.singsong.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class ShortsNotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public ShortsNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
