package com.sp.somdiaa.grci.lib.exception;

import com.sp.somdiaa.grci.lib.dto.response.ResponseMessage;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	@ExceptionHandler(value= UserNotAuthorizeException.class)
	public ResponseEntity<ResponseMessage> userNotAuthorizeExceptionHandler(UserNotAuthorizeException userNotAuthorizeException){
		log.warn(userNotAuthorizeException.getMessage(),userNotAuthorizeException.getCause());
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(new ResponseMessage(401, userNotAuthorizeException.getMessage()));
	}
	
	@ExceptionHandler(value= BabRequestException.class)
	public ResponseEntity<ResponseMessage> babRequestExceptionHandler(BabRequestException babRequestException){
		log.warn(babRequestException.getMessage(),babRequestException.getCause());
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseMessage(400, babRequestException.getMessage()));
	}
	@ExceptionHandler(value= MaxUploadSizeExceededException.class)
	public ResponseEntity<ResponseMessage> maxUploadSizeExceededException(MaxUploadSizeExceededException maxUploadSizeExceededException){
		log.warn(maxUploadSizeExceededException.getMessage(),maxUploadSizeExceededException.getCause());
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseMessage(400, "La taille maximale des fichiers acceptable ne peut dépasser 10MB"));
	}

	@ExceptionHandler(value= ServiceUnavailableException.class)
	public ResponseEntity<ResponseMessage> ServiceUnavailableException(ServiceUnavailableException serviceUnavailableException){
		log.warn(serviceUnavailableException.getMessage(),serviceUnavailableException.getCause());
		return ResponseEntity
				.status(HttpStatus.SERVICE_UNAVAILABLE)
				.body(new ResponseMessage(503, serviceUnavailableException.getMessage()));
	}
}
