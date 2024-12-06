package com.sp.somdiaa.grci.lib.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Project Name : somdiaa-grci-microservices
 *
 * @author : Patrick.M
 * @version:
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Perimetre {
    private Long id;

    private String name;

    private boolean isAffiliate;

    private String description;

    private List<Perimetre> filiales;
}
