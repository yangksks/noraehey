package com.singsong.api.controller;

import com.singsong.common.exception.code.ErrorCode;
import com.singsong.common.exception.file.FileUploadExtensionException;
import com.singsong.common.exception.magazine.MagazineNotFoundException;
import com.singsong.common.exception.member.MemberNotFoundException;
import com.singsong.common.exception.member.MemberUnauthorizedException;
import com.singsong.common.exception.response.ErrorResponse;
import com.singsong.common.exception.shorts.ShortsLikeDuplicatedException;
import com.singsong.common.exception.shorts.ShortsLikeNotFoundExcepion;
import com.singsong.common.exception.shorts.ShortsNotFoundException;
import com.singsong.common.exception.song.SongNotFoundException;
import com.singsong.common.exception.tag.TagDuplicationException;
import com.singsong.common.exception.tag.TagNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

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

    // 토큰 없는 경우 (401 Unauthorized)
    @ExceptionHandler(MemberUnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleMemberUnauthorizedException(MemberUnauthorizedException e){
        log.error("handleMemberUnauthorizedException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 태그가 없는 경우
    @ExceptionHandler(TagNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleTagNotFoundException(TagNotFoundException e) {
        log.error("handleTagNotFoundException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(TagDuplicationException.class)
    public ResponseEntity<ErrorResponse> handleTagDuplicationException(TagDuplicationException e) {
        log.error("handleTagDuplicationException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // TODO: IOException 나누기 (S3 업로드에도 IOException 가능)
    // Kakao IOException
    @ExceptionHandler(IOException.class)
    public ResponseEntity<ErrorResponse> handleKakaoIoException(IOException e){
        log.error("handleKakaoIoException",e);
        ErrorResponse response = new ErrorResponse(ErrorCode.KAKAO_IO_EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    // 노래
    @ExceptionHandler(SongNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleSongNotFoundException(SongNotFoundException e){
        log.error("handleSongNotFoundException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 쇼츠
    @ExceptionHandler(ShortsNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleShortsNotFoundException(ShortsNotFoundException e) {
        log.error("handleShortsNotFoundException", e);
        ErrorResponse response = new ErrorResponse(ErrorCode.SHORTS_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(ShortsLikeDuplicatedException.class)
    public ResponseEntity<ErrorResponse> handleShortsLikeDuplicationException(ShortsLikeDuplicatedException e) {
        log.error("handleShortsLikeDuplicationException", e);
        ErrorResponse response = new ErrorResponse(ErrorCode.SHORTS_LIKE_DUPLICATION);
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(ShortsLikeNotFoundExcepion.class)
    public ResponseEntity<ErrorResponse> handleShortsLikeNotFoundException(ShortsLikeNotFoundExcepion e) {
        log.error("handleShortsLikeNotFoundException", e);
        ErrorResponse response = new ErrorResponse(ErrorCode.SHORTS_LIKE_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 매거진
    @ExceptionHandler(MagazineNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMagazineNotFoundException(MagazineNotFoundException e) {
        log.error("handleMagazineNotFoundException", e);
        ErrorResponse response = new ErrorResponse(ErrorCode.MAGAZINE_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 파일 업로드
    @ExceptionHandler(FileUploadExtensionException.class)
    public ResponseEntity<ErrorResponse> handleFileUploadExtensionException(FileUploadExtensionException e) {
        log.error("handleFileUploadExtensionException", e);
        ErrorResponse response = new ErrorResponse(ErrorCode.FILE_UPLOAD_EXTENSION);
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
