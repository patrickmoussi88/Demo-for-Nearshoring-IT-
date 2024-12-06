package com.sp.somdiaa.grci.lib.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseMessage<T> {
    int status;
    String message;
    T data;

    public ResponseMessage(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
