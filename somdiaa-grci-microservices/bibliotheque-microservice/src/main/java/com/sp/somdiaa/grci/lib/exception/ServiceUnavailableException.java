package com.sp.somdiaa.grci.lib.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ServiceUnavailableException extends RuntimeException{
    private String message;
    public ServiceUnavailableException(String message) {
        super(message);
        this.message = message;
    }


}