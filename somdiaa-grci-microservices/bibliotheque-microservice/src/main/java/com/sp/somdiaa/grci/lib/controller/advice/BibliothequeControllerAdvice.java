package com.sp.somdiaa.grci.lib.controller.advice;

import com.sp.somdiaa.grci.lib.dto.response.ResponseMessage;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.IOException;

import static org.springframework.http.HttpStatus.*;

/**
 * Project Name : somdiaa-grci-microservices
 *
 * @author : Patrick.M
 * @version:
 */

//@ControllerAdvice
public class BibliothequeControllerAdvice {

    @ResponseStatus(EXPECTATION_FAILED)
    @ExceptionHandler({RuntimeException.class})
    public ResponseMessage catchAllRuntimeException(RuntimeException exception) {
        return new ResponseMessage(417, exception.getMessage());
    }

    @ResponseStatus(EXPECTATION_FAILED)
   @ExceptionHandler({IOException.class})
    public ResponseMessage catchAllIOException(IOException exception) {
        return new ResponseMessage(417, exception.getMessage());
    }
}
