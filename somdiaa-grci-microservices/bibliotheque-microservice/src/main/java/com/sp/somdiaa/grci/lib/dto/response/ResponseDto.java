package com.sp.somdiaa.grci.lib.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

/**
 * Project Name : somdiaa-grci-microservices
 *
 * @author : Patrick.M
 * @version:
 */

@AllArgsConstructor
@Getter
@Setter
public class ResponseDto <T>{
    HttpStatus code;
    String message;
    T data;
}
