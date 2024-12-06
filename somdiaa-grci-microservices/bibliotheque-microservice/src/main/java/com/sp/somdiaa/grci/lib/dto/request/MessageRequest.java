package com.sp.somdiaa.grci.lib.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {

    private String subject;

    private String content;

    private String email;

    private Channel channel;

    private List<Long> usersId;

    private MessageLevel messageLevel;
}