package com.sp.somdiaa.grci.lib.client;

import com.sp.somdiaa.grci.lib.dto.response.ResponseMessage;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name ="postFeignClient", url = "${configuration.service.baseurl}")
public interface ConfigurationClient {

	@GetMapping("/authentification/verify-token")
    ResponseEntity<ResponseMessage> checktokenofuser(@RequestHeader("Authorization") String token);
	
	@GetMapping("/users/{userId}")
	ResponseEntity<?> getuserById(@PathVariable("userId")Long userId,@RequestHeader("authorization") String token);
}
