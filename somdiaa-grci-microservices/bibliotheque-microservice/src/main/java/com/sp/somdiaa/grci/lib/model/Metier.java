package com.sp.somdiaa.grci.lib.model;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
public class Metier {
    private Long id;

    private String name;
}
