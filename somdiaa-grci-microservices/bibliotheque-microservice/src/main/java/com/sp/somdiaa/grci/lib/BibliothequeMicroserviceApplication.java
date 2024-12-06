package com.sp.somdiaa.grci.lib;

import com.sp.somdiaa.grci.lib.repository.DocumentRepository;
import com.sp.somdiaa.grci.lib.utils.LoadInitialData;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableFeignClients
@AllArgsConstructor
@OpenAPIDefinition(info = @Info(title = "Bibliothèque"))
public class BibliothequeMicroserviceApplication {

	private DocumentRepository documentRepository;

	public static void main(String[] args) {
		SpringApplication.run(BibliothequeMicroserviceApplication.class, args);
	}

	@Bean
	public CommandLineRunner loadData() throws Exception {

		return Args -> {
			int countDocumentItem = (int) documentRepository.count();
			if(countDocumentItem == 0) {
				LoadInitialData.loadInitDocument(documentRepository);
			}
		};
	}
}
