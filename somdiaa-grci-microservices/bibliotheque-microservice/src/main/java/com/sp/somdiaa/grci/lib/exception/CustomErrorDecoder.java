package com.sp.somdiaa.grci.lib.exception;

import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.sp.somdiaa.grci.lib.dto.response.ResponseMessage;
import feign.Response;
import feign.codec.ErrorDecoder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomErrorDecoder implements ErrorDecoder {

	private final ErrorDecoder defaultErrorDecoder = new Default();

	@Override
	public Exception decode(String invoqueur, Response response) {
		ResponseMessage<String> responseMessage = null;

		if (response.body() != null) {
			ObjectMapper mapper = new ObjectMapper();
			try {
				responseMessage = mapper.readValue(response.body().asInputStream(), ResponseMessage.class);
			} catch (IOException e) {
				log.error("erreur de mappage");
			}
			log.info("client error message: " + responseMessage.getMessage());
		}

		return switch (response.status()) {
			case 400 -> new BabRequestException(responseMessage.getMessage());
			case 401 -> {
				if (responseMessage != null) {
					throw new UserNotAuthorizeException(responseMessage.getMessage());
				} else {
					throw new UserNotAuthorizeException("Vous n'avez pas le doit d'acceder a cette ressource");
				}
			}
			case 503 -> new ServiceUnavailableException("Service indisponible");
			case 403 -> new UserNotAuthorizeException(responseMessage.getMessage(), 403);
			default -> throw new BabRequestException(responseMessage.getMessage());
		};
	}
}