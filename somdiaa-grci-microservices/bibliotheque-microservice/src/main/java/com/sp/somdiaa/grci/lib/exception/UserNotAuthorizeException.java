package com.sp.somdiaa.grci.lib.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SuppressWarnings("serial")
@NoArgsConstructor
@Getter @Setter
public class UserNotAuthorizeException extends RuntimeException{
	private String message;
	private int status;

	public UserNotAuthorizeException(String message) {
		super(message);
		this.message = message;
	}

	public UserNotAuthorizeException(String message, int status) {
		super(message);
		this.message = message;
		this.status = status;
	}
}
