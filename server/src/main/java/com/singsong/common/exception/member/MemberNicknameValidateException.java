package com.singsong.common.exception.member;

import com.singsong.common.exception.code.ErrorCode;

public class MemberNicknameValidateException extends RuntimeException{
    private ErrorCode errorCode;

    public MemberNicknameValidateException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}