package com.sp.somdiaa.grci.lib.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sp.somdiaa.grci.lib.exception.CustomErrorDecoder;

import feign.RequestInterceptor;

@Configuration
public class FiengClientConfig {

	
	@Bean
	public RequestInterceptor requestInterceptor() {
		return RequestTemplate -> {
			RequestTemplate.header("Content-Type", "application/json");
			RequestTemplate.header("Accept", "application/json");
		};
	}

    @Bean
    public CustomErrorDecoder mCustomErrorDecoder(){
        return new CustomErrorDecoder();
    }
}

