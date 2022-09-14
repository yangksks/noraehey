package com.singsong.api.controller;

import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.common.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e){
        log.error("handleException",e);
        ErrorResponse response = new ErrorResponse(ErrorCode.INTER_SERVER_ERROR);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // 멤버
    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMemberNotFoundException(MemberNotFoundException e){
        log.error("handleMemberNotFoundException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

//    @ExceptionHandler(NicknameDuplicateException.class)
//    public ResponseEntity<ErrorResponse> handleNicknameDuplicateException(NicknameDuplicateException e){
//        log.error("handleNicknameDuplicateException", e);
//        ErrorResponse response = new ErrorResponse(e.getErrorCode());
//        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
//    }
//
//    @ExceptionHandler(EmailDuplicateException.class)
//    public ResponseEntity<ErrorResponse> handleEmailDuplicateException(EmailDuplicateException e){
//        log.error("handleEmailDuplicateException", e);
//        ErrorResponse response = new ErrorResponse(e.getErrorCode());
//        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
//    }

}
