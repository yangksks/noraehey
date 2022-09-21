package com.singsong.common.exception.magazine;

import com.singsong.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class MagazineNotFoundException extends RuntimeException {
    private ErrorCode errorCode;

    public MagazineNotFoundException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

//    @Override
//    public synchronized Throwable fillInStackTrace() {
//        return this;
//    }
}
