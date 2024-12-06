package com.sp.somdiaa.grci.lib.config;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class AsynConfig {

	@Bean(value = "AsynNotification")
	public Executor mailExecutor() {
		ThreadPoolTaskExecutor exercutor= new ThreadPoolTaskExecutor();
		exercutor.setCorePoolSize(2);
		exercutor.setMaxPoolSize(4);
		exercutor.setQueueCapacity(50);
		exercutor.setThreadNamePrefix("async-mail-");
		exercutor.setKeepAliveSeconds(30);
		exercutor.initialize();
		return exercutor;
	}
}
