package com.singsong.common.exception.tag;

import com.singsong.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class TagNotFoundException extends RuntimeException{

    private ErrorCode errorCode;

    public TagNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }

}
