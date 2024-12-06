package com.sp.somdiaa.grci.lib.service;

import com.sp.somdiaa.grci.lib.model.Metier;
import com.sp.somdiaa.grci.lib.model.Perimetre;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "configuration", url="${configuration.service.baseurl}")
public interface ConfigurationRestClient {

    @GetMapping(path = "metiers")
    List<Metier> getAllMetier(@RequestHeader("Authorization")String token);

    @GetMapping(path = "perimetres")
    List<Perimetre> getAllPerimetre(@RequestHeader("Authorization")String token);
}
