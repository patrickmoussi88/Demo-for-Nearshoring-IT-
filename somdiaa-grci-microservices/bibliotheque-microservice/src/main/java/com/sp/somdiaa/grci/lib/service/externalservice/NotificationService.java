package com.sp.somdiaa.grci.lib.service.externalservice;


import com.sp.somdiaa.grci.lib.dto.request.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

	@Value("${application.kafka.topic}")
	private String topic;
	
	@Autowired
	private KafkaTemplate<String, MessageRequest> kafkaTemplate;
	
	@Async("AsynNotification")
	public void sendmessage(MessageRequest messageRequest) {
		kafkaTemplate.send(topic, messageRequest);
	}
}

