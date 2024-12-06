package com.sp.somdiaa.grci.lib.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SuppressWarnings("serial")
@NoArgsConstructor
@Getter @Setter
public class BabRequestException extends RuntimeException{
	private String message;
	public BabRequestException(String message) {
		super(message);
		this.message = message;
	}
	
	
}