package com.singsong.common.exception.member;

import com.singsong.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class MemberImageNotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public MemberImageNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}